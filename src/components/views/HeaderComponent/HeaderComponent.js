import React from 'react';
import logo_icon from '../../../assets/logo_kor.png';
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderComponent = () => {
  return (
    <Header>
      <Link to="/">
        <img src={logo_icon} />
      </Link>
      <nav id="headernav">
        <Link to="/map">도움말</Link>
        <Link to="/map">지도</Link>
        <Link to="/map">마이페이지</Link>
        <Link to="/map">로그인</Link>
      </nav>
    </Header>
  );
};

export default HeaderComponent;

const Header = styled.h1`
    margin-bottom: 22px;
    margin-top: 19px;
    font-size: 12px;
    font-weight: 400;
    color: background: #838383;
    padding-left:230px;
    padding-right:230px;
`;
