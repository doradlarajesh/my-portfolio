const logoModules = import.meta.glob("../assets/tool-logos/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const logoSources = Object.fromEntries(
  Object.entries(logoModules).map(([path, source]) => [path.split("/").pop() ?? path, source]),
) as Record<string, string>;

const toolLogoFiles: Record<string, string> = {
  "iOS XCUITest": "xcode.svg",
  Appium: "appium.svg",
  Selenium: "selenium.svg",
  Playwright: "playwright.svg",
  Java: "openjdk.svg",
  JavaScript: "javascript.svg",
  Swift: "swift.svg",
  Python: "python.svg",
  JUnit: "junit5.svg",
  Jest: "jest.svg",
  Pytest: "pytest.svg",
  Postman: "postman.svg",
  Insomnia: "insomnia.svg",
  "GitHub Actions": "githubactions.svg",
  Fastlane: "fastlane.svg",
  Jenkins: "jenkins.svg",
  Docker: "docker.svg",
};

interface ToolLogoProps {
  className?: string;
  fallback: string;
  name: string;
}

const ToolLogo = ({ name, fallback, className = "h-8 w-8" }: ToolLogoProps) => {
  const source = logoSources[toolLogoFiles[name]];

  if (source) {
    return (
      <img
        src={source}
        alt={`${name} logo`}
        className={`${className} object-contain`}
        loading="lazy"
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={`${name} icon`}
      className={`${className} inline-flex items-center justify-center text-2xl leading-none`}
    >
      {fallback}
    </span>
  );
};

export default ToolLogo;