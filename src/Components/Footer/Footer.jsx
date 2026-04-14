import styles from "./Footer.module.css";
import { GithubLogo, ProjectLogo } from "./FooterIcons";

import imgDaniela from "../../assets/daniela_profile.jpeg";
import imgAbril from "../../assets/abril_profile.jpeg";
import imgErick from "../../assets/erick_profile.jpeg";

const Footer = () => {
  const members = [
    {
      avatar: imgDaniela,
      name: "Daniela Oñitabia FAI-4775",
      url: "https://github.com/DanielaOnatibia",
      roleWeb: "Scrum Master / PM",
      roleMobile: '"Scrum Master / PM"',
    },
    {
      avatar: imgAbril,
      name: "Abril Gavilan FAI-5163",
      url: "https://github.com/abrilgavilan11",
      roleWeb: "Desarrolladora",
      roleMobile: '"Desarrolladora"',
    },
    {
      avatar: imgErick,
      name: "Erick Gonzalez FAI-3433",
      url: "https://github.com/DevEriik",
      roleWeb: "Desarrollador",
      roleMobile: '"Desarrollador"',
    },
  ];

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerHeader}>
        <h3>
          Facultad de Informática - Programación Web Avanzada - TP 1 REACT 2026
        </h3>
      </div>

      <div className={styles.membersCard}>
        <ul className={styles.membersList}>
          {members.map((member, index) => (
            <li key={index} className={styles.memberItem}>
              <div className={styles.memberLeft}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className={styles.avatar}
                />
                <a
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.memberNameLink}
                >
                  {member.name}
                </a>
              </div>

              <div className={styles.memberDivider}></div>

              <div className={styles.memberRight}>
                <span className={styles.memberRoleWeb}>{member.roleWeb}</span>
                <span className={styles.memberRoleMobile}>
                  {member.roleMobile}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.linksSection}>
        <a
          href="https://github.com/DanielaOnatibia/TP1-de-PWA"
          className={styles.linkItem}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo />
          github.com/DanielaOnatibia/TP1-de-PWA
        </a>
        <a
          href="https://github.com/users/DanielaOnatibia/projects/3"
          className={styles.linkItem}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ProjectLogo />
          github.com/DanielaOnatibia/projects
        </a>
      </div>

      <div className={styles.creditsSection}>Hecho por NoCode</div>
    </footer>
  );
};

export default Footer;
