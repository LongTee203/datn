const testimonials = [
  {
    text: `"PetCare Plus là nơi duy nhất tôi tin tưởng để làm đẹp cho Max. Cậu bé luôn về nhà với tâm trạng vui vẻ, thơm tho và trông cực kỳ sang xịn!"`,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtJ2aFZU6VCuGKNCsLTG-1nyAdVJ_HOsxw7ydFf4zk7XQl7Kuz0kecmSo3QmB2ZFPVvVqyHsQZKv_qd6gkHPYKrNtOKFEcFOfUWo1t1r-tsAaJbZ6qbGAPv8jHrUh-O6tWzfCXL_uDQHcPxii4FTrhk4WtycV9euSjpwuNKtZen_Boivy8i3wSgguvnolntMh4g-6zdUcyq2VVO4EGUV-g0RMJNZvefyyqotbh7TUEgXbqFmrclm-H0AaDdyG36x7CYA8aXQnZFzU8",
    name: "Sarah Johnson",
    petDescription: "Chủ nuôi Golden Retriever",
  },
  {
    text: `"Khách sạn thú cưng thật tuyệt vời. Tôi từng rất lo lắng khi phải để Luna lại một tuần, nhưng những cập nhật hình ảnh hàng ngày và sự chuyên nghiệp của nhân viên đã làm tôi an tâm."`,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByfC_m9YnNJmuK-O4MXW5qapujFMZwX-zjUfnyVhSlFGo_8o7w1Qwn9ZZ0aPYl_0_ORnsgBsbEM8-ov7CzWwMTZVxpgpFkko4t39KDh5MgWV9Qj35Q2yXo8pVRnAgNHjPj64oVNHRNSr0ydLvVerVhzA3mFd8ouzJN2n6cRX9DUF6XqonwQEBrVR_3ndlRV-kQsvJKVKPvj-A9nesNtFbh_9EWKIAwAipTBqoPAMJuRSSoZtt0GsGPMx5UOCdU4wQiLJdxa0zeS6sK",
    name: "David Chen",
    petDescription: "Chủ nuôi mèo Ba Tư",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-primary/5 rounded-[3rem] px-8 md:px-20 my-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-black mb-4 font-headline">
          Cảm nhận từ Chủ Nuôi
        </h2>
        <p className="text-gray-600">
          Gia nhập hàng ngàn gia đình hạnh phúc đã tin tưởng trao gửi niềm
          vui của thú cưng cho PetCare Plus.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map(({ text, avatarUrl, name, petDescription }) => (
          <div
            key={name}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm flex flex-col gap-4"
          >
            {/* Stars */}
            <div className="flex text-accent-orange">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined fill-1"
                >
                  star
                </span>
              ))}
            </div>

            <p className="italic text-lg text-[#111811] dark:text-gray-200">
              {text}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div
                className="size-12 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url("${avatarUrl}")` }}
                role="img"
                aria-label={`Portrait of ${name}`}
              />
              <div>
                <h4 className="font-bold font-headline">{name}</h4>
                <p className="text-sm text-gray-500">{petDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <span className="size-2.5 rounded-full bg-primary" />
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="size-2.5 rounded-full bg-gray-300" />
      </div>
    </section>
  );
}
