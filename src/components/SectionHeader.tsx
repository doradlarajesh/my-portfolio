interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
}

const sectionTitleStyle = { color: "hsl(var(--section-title-from))" };
const sectionDescriptionStyle = { color: "hsl(var(--section-title-fallback) / 0.78)" };

const SectionHeader = ({
  title,
  description,
  className = "",
  descriptionClassName = "",
}: SectionHeaderProps) => {
  return (
    <header className={`text-center mb-16 ${className}`.trim()}>
      <h2 className="text-4xl md:text-5xl font-bold mb-6" style={sectionTitleStyle}>
        {title}
      </h2>

      {description ? (
        <p
          className={`text-xl max-w-3xl mx-auto ${descriptionClassName}`.trim()}
          style={sectionDescriptionStyle}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
};

export default SectionHeader;