import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

// PATCH /api/appointments/[id] – update status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, pet_name, appointment_date, customer_id, service_id } = body;

    const dataToUpdate: any = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (pet_name !== undefined) dataToUpdate.pet_name = pet_name;
    if (appointment_date !== undefined) dataToUpdate.appointment_date = new Date(appointment_date);
    if (customer_id !== undefined) dataToUpdate.customer_id = parseInt(String(customer_id), 10);
    if (service_id !== undefined) dataToUpdate.service_id = parseInt(String(service_id), 10);

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "Không có dữ liệu cập nhật" },
        { status: 400 }
      );
    }

    const appointmentIdInt = parseInt(id, 10);

    // Nếu chuyển sang trạng thái hủy, xóa phân công nhân viên và thông tin thanh toán
    if (status === "Cancelled") {
      await prisma.staff_schedules.deleteMany({
        where: { appointment_id: appointmentIdInt }
      });
      await prisma.payments.deleteMany({
        where: {
          source_type: "appointment",
          source_id: appointmentIdInt
        }
      });
    }

    await prisma.appointments.update({
      where: { appointment_id: appointmentIdInt },
      data: dataToUpdate,
    });

    return NextResponse.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Không tìm thấy lịch hẹn" },
        { status: 404 }
      );
    }
    console.error("[PATCH /api/appointments/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/appointments/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.appointments.delete({
      where: { appointment_id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Xóa lịch hẹn thành công" });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Không tìm thấy lịch hẹn" },
        { status: 404 }
      );
    }
    console.error("[DELETE /api/appointments/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
