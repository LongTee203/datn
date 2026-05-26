import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id, 10);

    // 1. Lịch sử mua hàng (orders)
    const paidOrderPayments = await prisma.payments.findMany({
      where: { source_type: "order", status: "paid" },
      select: { source_id: true, amount: true, created_at: true }
    });
    const paidOrderIds = paidOrderPayments.map(p => p.source_id);

    const customerOrders = await prisma.orders.findMany({
      where: { customer_id: customerId, order_id: { in: paidOrderIds } },
      include: { order_details: { include: { products: true } } },
      orderBy: { created_at: "desc" }
    });

    const purchaseHistory = customerOrders.map(order => {
      const payment = paidOrderPayments.find(p => p.source_id === order.order_id);
      
      // Lấy tên sản phẩm đầu tiên hoặc ghép lại
      const mainProduct = order.order_details[0]?.products?.product_name || "Sản phẩm";
      const moreCount = order.order_details.length - 1;
      const title = moreCount > 0 ? `${mainProduct} và ${moreCount} sản phẩm khác` : mainProduct;

      return {
        id: `ORDER-${order.order_id}`,
        icon: "shopping_bag",
        title: title,
        date: payment?.created_at 
          ? new Date(payment.created_at).toLocaleDateString("vi-VN") + ` • Đơn hàng #${order.order_id}`
          : `Đơn hàng #${order.order_id}`,
        price: payment ? Number(payment.amount) : Number(order.total_amount),
        status: "Thành công",
        statusColor: "text-emerald-600"
      };
    });

    // 2. Lịch sử dịch vụ (appointments)
    const paidApptPayments = await prisma.payments.findMany({
      where: { source_type: "appointment", status: "paid" },
      select: { source_id: true, amount: true, created_at: true }
    });
    const paidApptIds = paidApptPayments.map(p => p.source_id);

    const customerAppts = await prisma.appointments.findMany({
      where: { customer_id: customerId, appointment_id: { in: paidApptIds } },
      include: { services: true },
      orderBy: { appointment_date: "desc" }
    });

    const serviceHistory = customerAppts.map(appt => {
      const payment = paidApptPayments.find(p => p.source_id === appt.appointment_id);
      const petName = appt.pet_name ? ` cho ${appt.pet_name}` : "";
      const serviceName = appt.services?.service_name || "Dịch vụ";
      
      const apptDate = new Date(appt.appointment_date);
      const timeString = apptDate.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      const dateString = apptDate.toLocaleDateString("vi-VN");

      return {
        id: `APPT-${appt.appointment_id}`,
        icon: "medical_services", // or content_cut
        title: `${serviceName}${petName}`,
        petNameRaw: appt.pet_name,
        serviceName: serviceName,
        description: appt.services?.description || "",
        category: appt.services?.category || "Khác",
        time: timeString,
        realDate: dateString,
        date: dateString + ` • Lịch hẹn #${appt.appointment_id}`,
        price: payment ? Number(payment.amount) : Number(appt.services?.price || 0),
        status: "Hoàn tất",
        statusColor: "text-emerald-600"
      };
    });

    return NextResponse.json({
      serviceHistory,
      purchaseHistory
    });
  } catch (err) {
    console.error("[GET /api/customers/[id]/history]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
