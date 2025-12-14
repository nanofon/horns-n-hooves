import { useEffect, useState, useRef } from "preact/hooks";
import { JSX } from "preact";
import { getAllPortfolios, Portfolio } from "../../api/portfolio";
import styles from "./DropDownPortfolios.module.css";

export const DropDownPortfolios = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    getAllPortfolios().then(({ portfolios }) => {
      setPortfolios(portfolios);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleClick = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevents the global close listener from firing immediately
    setIsOpen((prev) => !prev);
  };

  const handleHover = (isHovering: boolean) => {
    // Only allow hover control on desktop (media query controlled by CSS, but this is a fail-safe)
    if (window.innerWidth > 768) {
      setIsOpen(isHovering);
    }
  };

  const handleLinkClick = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    // Prevents the navigation script in NavigationBar.astro from closing the entire nav drawer prematurely
    e.stopPropagation();
    // Note: The rest of the nav-closing logic should happen in the parent Astro script on successful navigation.
  };

  const ToggleIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? "active" : ""}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className={styles.dropdownHeader}>
        <a
          href="./portfolios"
          className={styles.dropdownLink}
          onClick={handleLinkClick}
        >
          Portfolios
        </a>

        <button
          className={styles.dropdownToggleBtn}
          aria-label="Toggle portfolios menu"
          aria-expanded={isOpen}
          onClick={handleToggleClick}
        >
          <ToggleIcon />
        </button>
      </div>

      {!isLoading && (
        <ul className={styles.dropdownMenu} aria-label="Portfolios submenu">
          {portfolios.map((p) => (
            <li key={p.Alias} className={styles.dropdownMenuItem}>
              <a
                href={`./portfolios?alias=${encodeURIComponent(p.Alias)}`}
                className={styles.dropdownMenuLink}
                onClick={handleLinkClick}
              >
                {p.Name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
