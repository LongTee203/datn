import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appointment_id = parseInt(id, 10);
    const { staff_id } = await req.json();

    if (!staff_id) {
      return NextResponse.json({ error: "Thiếu staff_id" }, { status: 400 });
    }

    // Lấy thông tin lịch hẹn
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id },
      include: { services: true }
    });

    if (!appointment) {
      return NextResponse.json({ error: "Không tìm thấy lịch hẹn" }, { status: 404 });
    }

    const duration = appointment.services?.duration || 60; // mặc định 60p
    const startDate = new Date(appointment.appointment_date);
    const endDate = new Date(startDate.getTime() + duration * 60000);

    // Xóa phân công cũ nếu có
    await prisma.staff_schedules.deleteMany({
      where: { appointment_id }
    });

    // Tạo phân công mới
    const schedule = await prisma.staff_schedules.create({
      data: {
        appointment_id,
        staff_id,
        work_date: startDate,
        start_time: startDate,
        end_time: endDate,
      }
    });

    // Tự động chuyển trạng thái lịch hẹn sang Confirmed nếu chưa
    if (appointment.status === "Pending") {
      await prisma.appointments.update({
        where: { appointment_id },
        data: { status: "Confirmed" }
      });
    }

    return NextResponse.json({ message: "Phân công thành công", schedule });
  } catch (err) {
    console.error("[POST /api/appointments/[id]/assign]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
