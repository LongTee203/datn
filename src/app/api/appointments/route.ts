import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

// GET /api/appointments – list with customer, service & pet info
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
        note: true,
        payment_method: true,
        receipt_image: true,
        created_at: true,
        customers: {
          select: {
            full_name: true,
            phone: true,
            pets: {
              select: { name: true, type: true, breed: true, weight: true },
            },
          },
        },
        services: {
          select: { service_name: true, price: true, duration: true },
        },
        staff_schedules: {
          select: {
            staff: {
              select: {
                staff_id: true,
                full_name: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: { appointment_date: "desc" },
    });

    // Flatten and enrich with pet details by matching pet_name
    const rows = appointments.map(({ customers, services, staff_schedules, ...a }) => {
      const matchedPet = customers?.pets?.find(
        (p) => p.name.toLowerCase() === a.pet_name?.toLowerCase()
      );
      
      const assignedStaff = staff_schedules?.[0]?.staff ?? null;
      return {
        ...a,
        customer_name: customers?.full_name ?? null,
        customer_phone: customers?.phone ?? null,
        service_name: services?.service_name ?? null,
        service_price: services?.price ? Number(services.price) : null,
        service_duration: services?.duration ?? null,
        pet_type: matchedPet?.type ?? null,
        pet_breed: matchedPet?.breed ?? null,
        pet_weight: matchedPet?.weight ? Number(matchedPet.weight) : null,
        assigned_staff: assignedStaff,
      };
    });

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
    const { customer_id, service_id, pet_name, appointment_date, status, note, payment_method, receipt_image } = body;

    if (!pet_name || !appointment_date || !customer_id || !service_id) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc (thú cưng, dịch vụ, khách hàng)" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointments.create({
      data: {
        customer_id: parseInt(String(customer_id), 10),
        service_id:  parseInt(String(service_id),  10),
        pet_name,
        appointment_date: new Date(appointment_date),
        status: status ?? "Pending",
        note: note || null,
        payment_method: payment_method || null,
        receipt_image: receipt_image || null,
      },
      select: { appointment_id: true },
    });

    // Notify admin about new booking
    await createNotification({
      type:      "booking",
      title:     `Lịch hẹn mới #APT-${appointment.appointment_id}`,
      message:   `Khách hàng vừa đặt lịch cho thú cưng "${pet_name}" vào ${new Date(appointment_date).toLocaleString("vi-VN")}, đang chờ xác nhận.`,
      source_id: appointment.appointment_id,
    });

    return NextResponse.json(
      { appointment_id: appointment.appointment_id, message: "Tạo lịch hẹn thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/appointments]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
