import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";
import styles from "./LanguageSwitch.module.css";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  function changeLocale(locale) {
    i18n.changeLanguage(locale);
  }

  const locales = [
    {
      eventKey: "en",
      title: "English",
    },
    {
      eventKey: "bg",
      title: "Български",
    },
  ];

  const getNavDropdownItems = () => {
    return locales.map(({ eventKey, title }) => {
      const isActive = i18n.language === eventKey;
      return (
        <NavDropdown.Item
          key={eventKey}
          eventKey={eventKey}
          onClick={() => changeLocale(eventKey)}
          className={`${styles["nav-dropdown-item"]} ${
            isActive ? styles["active"] : ""
          }`}
        >
          <div className="d-flex align-items-center">
            <span>{title}</span>
          </div>
        </NavDropdown.Item>
      );
    });
  };

  const getSelectedLanguageItem = () => {
    return locales.find((item) => item.eventKey === i18n.language);
  };

  return (
    <NavDropdown
      onSelect={changeLocale}
      title={getSelectedLanguageItem().title}
      className="bs-dark"
    >
      {getNavDropdownItems()}
    </NavDropdown>
  );
}
