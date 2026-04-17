import Link from "next/link";

interface ServiceCardProps {
  imageUrl: string;
  imageAlt: string;
  iconName: string;
  iconColorClass: string;
  iconBgClass: string;
  iconHoverBgClass: string;
  iconHoverTextClass: string;
  title: string;
  description: string;
  linkColorClass: string;
}

export default function ServiceCard({
  imageUrl,
  imageAlt,
  iconName,
  iconColorClass,
  iconBgClass,
  iconHoverBgClass,
  iconHoverTextClass,
  title,
  description,
  linkColorClass,
}: ServiceCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden">
      {/* Card image */}
      <div
        className="aspect-[16/10] bg-cover bg-center"
        style={{ backgroundImage: `url("${imageUrl}")` }}
        role="img"
        aria-label={imageAlt}
      />
      {/* Card body */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`size-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${iconBgClass} ${iconColorClass} ${iconHoverBgClass} ${iconHoverTextClass}`}
          >
            <span className="material-symbols-outlined text-2xl">
              {iconName}
            </span>
          </div>
          <h3 className="text-xl font-bold font-headline">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
        <Link
          href="/services"
          className={`inline-flex items-center gap-1 font-bold group-hover:gap-2 transition-all ${linkColorClass}`}
        >
          Tìm hiểu thêm{" "}
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
        </Link>
      </div>
    </div>
  );
}
