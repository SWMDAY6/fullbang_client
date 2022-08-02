import React, { useState, useEffect } from 'react';
import { API } from '../../../../../config';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Location = ({ location, setLocation }) => {
  const [isToggleBox, setToggleBox] = useState(false);
  const [place, setPlace] = useState([]);

  useEffect(() => {
    fetch(`${API}/hotels/main`)
      .then((res) => res.json())
      .then((res) => {
        setPlace(res.results);
      });
  }, []);

  const handleToggleBox = () => {
    setToggleBox(!isToggleBox);
  };
  const closeToggleBox = (location) => {
    setToggleBox(false);
    setLocation(location);
  };

  return (
    <>
      <LocationWrap onClick={handleToggleBox}>
        <SearchBox value={location} />
        <IconBox>{/* <FontAwesomeIcon icon={faMapMarkerAlt} /> */}</IconBox>
      </LocationWrap>
      <SelectLocation display={isToggleBox}>
        <Title>주변 인기 여행지</Title>
        {place &&
          place.map((category, index) => (
            <SelectLocationTitle
              key={index}
              onClick={() => {
                closeToggleBox(category.location);
              }}
              value={category.location[index]}
            >
              <Icon>{/* <FontAwesomeIcon icon={faMapMarkerAlt} /> */}</Icon>
              {category.location}
            </SelectLocationTitle>
          ))}
      </SelectLocation>
    </>
  );
};

export default Location;

const LocationWrap = styled.div`
  position: relative;
`;

const IconBox = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 25px;
  color: ${(props) => props.theme.mainColor};
`;

const SearchBox = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: '다음 숙소는 어디로?',
}))`
  display: flex;
  align-items: center;
  width: 380px;
  height: 60px;
  margin-right: 20px;
  padding-left: 15px;
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 5px;
  outline: none;
  background-color: ${({ theme }) => theme.white};
  font-size: 16px;
  cursor: pointer;
  display: ${({ placeholder }) => placeholder || 'inline - block'};
  font-size: ${({ text }) => text || '20px'};
  color: ${({ text }) => text || `${({ theme }) => theme.fontGray}`};
  text-indent: ${({ text }) => text || '30px'};

  &:hover {
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

const SelectLocation = styled.div`
  position: absolute;
  display: ${({ display }) => (display ? 'flex' : 'none')};
  flex-direction: column;
  width: 400px;
  height: 320px;
  left: 320px;
  margin-top: 400px;
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.white};
  cursor: pointer;
`;

const Title = styled.span`
  margin-bottom: 20px;
  padding-top: 20px;
  padding-left: 15px;
  font-weight: ${({ theme }) => theme.fontWeightBold};
  font-size: 20px;
  color: ${({ theme }) => theme.fontGray};
`;

const SelectLocationTitle = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 18px;
  color: ${({ theme }) => theme.fontGray};
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  color: ${({ theme }) => theme.mainColor};
`;
