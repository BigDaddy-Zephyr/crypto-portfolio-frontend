import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import GoogleLoginComponent from "./googleButton.js";
import { NavLink } from 'react-router-dom'
import { useHistory, Link } from "react-router-dom";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";

const Header = ({ t }: any) => {
  const [visible, setVisibility] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };
  

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <>
        <CustomNavLinkSmall>
          <Link to="/dashboard">Dashboard</Link>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall>
          <Link to="/dashboard">About</Link>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall>
        <a target="_blank" href="https://hypnotic-kicker-14d.notion.site/Crypto-portfolio-emailer-fe4e59842fee42319492d9e438b80f43">Blog</a>
        </CustomNavLinkSmall>
        {/* <CustomNavLinkSmall onClick={() => scrollTo("contact")}>
          <Span>{t("About")}</Span>
        </CustomNavLinkSmall> */}
        {/* <CustomNavLinkSmall
          style={{ width: "180px" }}
          onClick={() => scrollTo("Contact")}
        >
          <Span>
            <Button>{t("Contact")}</Button>
          </Span>
        </CustomNavLinkSmall> */}
        <span><CustomNavLinkSmall style={{ width: "300px" }}><GoogleLoginComponent /> </CustomNavLinkSmall></span>
        
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
            {/*          */}
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default (Header);
