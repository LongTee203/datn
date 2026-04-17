import Image from "next/image";

const teamMembers = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDydW1mtKw6I6SlhtBlahH_0l9ZBzy86joFEcAiIHC3KXgXIkfO6F2BTQcbhfCyNmYNJIkmHRvkX4y-WH1J5TPaDMM1wk7dCxY1B6qq6rCdsXkAgdow929K8jj45v5kDImLz6cf9f3vxsqW9M5xoI2suD1U8Dkp-8vQPnUeqAmtASyUlFc5vgmiMO1beoebtyA-E7j27-Qstj0hVcofpB7TiW12Kf3AvtS_OziVJhLPTsqBLTMySFg9IpzqqfDcMf9Gqw6GN-vouwjr",
    name: "Dr. Nguyễn Minh",
    role: "Bác sĩ Thú y Trưởng",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5oFy5XAO2CutCUgRxEsjLZKPQRuQHH0oObaaOFEs-f-GdVH6mra0yARcjKmyKdxT7bb0JQzbeI1KrvsT4E3wNm6lVBtGocR9QqkJRokzJCkNqO9PXR9hQHfyWwRQqqMY9zzre1OUaR8oqhWb5X3ZMPZsSMhKcCTIeClDj7RVngFTxnBvMaPz3XPek-WddOsZBxkg9eN478hfEwct7Ay87QwAyrJ3tT_y0FNQdWbTnEgr-zAsNTJ8d19qpOouGUO4Lc6iBSlhh1_oS",
    name: "Trần Lan Anh",
    role: "Chuyên gia Làm đẹp",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNzAIE-R4VzFVwweWgN1gIoyOxV0aRa_8FfdCjuy67YmS3p-m9bMso1UrbF0DNV_xLUHEaJEJQ_Vd33MbjCDMx_F523zS_T05B2T59k2D-T44j04AWd8kMxNP4tdKdN70Qa3NAROzkWaTwMPXw7IDQG0tS17byZvqxGW5uxUyd9LxM1b9YtHrmFrbW44oMGkA4R1lj1EF9kK2kM47oK_-U9DyQFYudQuvd2LG2_360uuqR_mbf5kciUc4WMIgufEMPSLop31QDLnlx",
    name: "Lê Hoàng",
    role: "Quản lý Khách sạn",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYdZN9f_YdJDahYp4Q2cmaluLIUnHep32s_Yr2UhSFB0Y0CqcfbgcgBvch9BpiTNYmLZqD7cvoudh8wle5PKlpIba2YUv5pXl5Al8lq48edxL6TSYGHQEzGBiBPQKBbAEFmVB1pJW39IVoHm3KvTz4VBn9rY_9m_B-sdzY11YJUGEWFDRbt4E4NERc2WK1znU7wqmS-8OrjdiBH1R5gOuNy3qjeOrKNCQK9LXfD_abfylfws68tkuwqSKBXL-5hBf6SxbMpPlez4sj",
    name: "Dr. Phạm My",
    role: "Chuyên gia Dinh dưỡng",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM3A2-DgKAy4G7s8cmKKNaMqWvF9RkAMJImS0FCRFvo4v_bbzrAfamEE75Se6KY9s1rCDTZ0eK6mBvRYOxMaHkQCmUJbu10Yrur2JpkLeICRLF5H18FA_qfL9ilO-VbN-Ka1Q73sEo-I4YSbmGfweu8B62KiNqR4gPaMIQPDws7BBWpOgWwWxRPHqdckuQqaE7JtB7gyX6CG9NWN7Az8ePXJO52QtLPAY61fergHCZFdeLW8eEmJT2i5RWPUsaqRMB4E3j4VAcPTiO",
    name: "Hoàng Thu",
    role: "Huấn luyện viên",
  },
];

export default function CareTeamSection() {
  return (
    <section className="py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-[#111811] dark:text-white mb-4 font-headline">
          Đội ngũ chăm sóc
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Những chuyên gia tận tâm luôn sẵn sàng mang lại điều tốt nhất cho
          thú cưng của bạn.
        </p>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar -mx-6 px-6 snap-x">
        {teamMembers.map(({ src, name, role }) => (
          <div key={name} className="min-w-[280px] snap-start group">
            <div className="relative overflow-hidden rounded-[2.5rem] mb-6 bg-primary/5 aspect-[3/4]">
              <Image
                src={src}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h4 className="text-xl font-bold text-[#111811] dark:text-white font-headline">
              {name}
            </h4>
            <p className="text-primary font-semibold">{role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
