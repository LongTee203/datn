import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/appointments – list with customer & service info
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();
    const date = searchParams.get("date")?.trim();

    const appointments = await prisma.appointments.findMany({
      where: {
        ...(status && status !== "all" && { status }),
        ...(date && {
          appointment_date: {
            gte: new Date(`${date}T00:00:00`),
            lte: new Date(`${date}T23:59:59`),
          },
        }),
      },
      select: {
        appointment_id: true,
        customer_id: true,
        service_id: true,
        pet_name: true,
        appointment_date: true,
        status: true,
        created_at: true,
        customers: {
          select: { full_name: true, phone: true },
        },
        services: {
          select: { service_name: true },
        },
      },
      orderBy: { appointment_date: "desc" },
    });

    // Flatten joined fields
    const rows = appointments.map(({ customers, services, ...a }) => ({
      ...a,
      customer_name: customers?.full_name ?? null,
      customer_phone: customers?.phone ?? null,
      service_name: services?.service_name ?? null,
    }));

    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/appointments]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/appointments – create new appointment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id, service_id, pet_name, appointment_date, status } = body;

    if (!pet_name || !appointment_date) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointments.create({
      data: {
        customer_id: customer_id ?? null,
        service_id: service_id ?? null,
        pet_name,
        appointment_date: new Date(appointment_date),
        status: status ?? "Pending",
      },
      select: { appointment_id: true },
    });

    return NextResponse.json(
      {
        appointment_id: appointment.appointment_id,
        message: "Tạo lịch hẹn thành công",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/appointments]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
