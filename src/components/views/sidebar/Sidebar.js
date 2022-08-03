import styled from "styled-components";
import "./Sidebar.css";
import yanolja from "../../../assets/logo_yanolja.png";
import yeogiattae from "../../../assets/logo_yeogiattae.png";
import { AccomodationList } from "../LandingPage/LandingPage";

const Sidebar = (props) => {
  // const { switchSearchDetail, switchMapDetail, switchMyPageDetail, openModal } =
  //   useGlobalContext();

  return (
    <aside className="sidebar show-sidebar">
      <input
        type="textbox"
        id="searchTextbox"
        placeholder="업체명을 입력해주세요."
      />
      <AccommodationWrap>
        {props.AccomodationList.map((data) => {
          return (
            <AccommodationBox>
              <img className="accomodationImg" alt="숙소 사진" src={data.img_src} />

              <div className="accomodationName">{data.name}</div>

              <br />
                <br />
                <br />
              <br />
              <div className="yanoljaPrice">
                <img src={yanolja} alt="야놀자" />
                <div>
                  {data.yanolja
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </div>
              </div>
              <br />
              <div className="yeogiattaePrice">
                <img src={yeogiattae} alt="여기어때" />
                  <div>
                {data.yeogiattae
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
                  </div>
              </div>
            </AccommodationBox>
          );
        })}
      </AccommodationWrap>
    </aside>
  );
};

const AccommodationWrap = styled.div`
  height: calc(100% - 74px);
  margin-top: 26px;
  text-align: center;
  overflow: auto;
`;

const AccommodationBox = styled.div`
  border: 1px solid #d0d0d0;
  height: 163px;
  width: 349px;
  margin-top: 9px;
  margin-left: 10px;
`;

export default Sidebar;
