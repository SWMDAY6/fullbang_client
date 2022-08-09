import React, { useEffect, useState } from "react";
import { setConstantValue, setSyntheticLeadingComments } from "typescript";
import { propsType } from "../LandingPage";
import { useGlobalContext } from "../../../../context";
import axios from "axios";
import promotion_marker from "../../../../assets/promotion_marker.png"
import hotel_marker from "../../../../assets/hotel_marker.png"
import motel_marker from "../../../../assets/motel_marker.png"
import pension_marker from "../../../../assets/pension_marker.png"
import camping_marker from "../../../../assets/camping_marker.png"


interface placeType {
  road_address_name: string;
  place_name: string;
  address_name: string;
  place_url: string;
  phone: string;
}

// head에 작성한 Kakao API 불러오기
const { kakao } = window as any;

const Map = (props:any) => {
  // 마커를 담는 배열
  let markers: any[] = [];
  const AccomodationTypeMarker = {
    "MOTEL" : motel_marker,
    "PROMOTION" : promotion_marker,
    "HOTEL" : hotel_marker,
    "PENSION" : pension_marker,
    "CAMPING" : camping_marker
  };
  const { selectedAddress, setSelectedAddressDetail, mapCenter,selectedboxAddress } = useGlobalContext();
  // const [state, setState] = useState({
  //   center: mapCenter,
  //   errMsg: null,
  //   isLoading: true,
  // });
  // const [zoomLevel, setZoomLevel] = useState(2);
  // const [address, setAddress] = useState();

  function removeMarker() {
    console.log("removeMarker");
    console.log(markers);
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }
  const locationToAddress = (center: any, level: any) => {
    const url =
      "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&y=" +
      center.getLat() +
      "&x=" +
      center.getLng();
    console.log(url);
    return fetch(url, {
      headers: {
        Authorization:
          "KakaoAK " + process.env.REACT_APP_REST_API_KAKAO_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if(json!=undefined) {
          console.log({
            sido:json.documents[0].code.substring(0,2),
            sigungu:json.documents[0].code.substring(2,5),
            dong:json.documents[0].code.substring(5,8)
          });
          if(level < 7) {
            setSelectedAddressDetail({
              sido: json.documents[0].code.substring(0, 2),
              sigungu: json.documents[0].code.substring(2, 5),
              dong: json.documents[0].code.substring(5, 8)
            });
          }
          else if(level < 9) {
            setSelectedAddressDetail({
              sido: json.documents[0].code.substring(0, 2),
              sigungu: json.documents[0].code.substring(2, 5),
              dong: 0
            });
          }
          else {
            setSelectedAddressDetail({
              sido: json.documents[0].code.substring(0, 2),
              sigungu: 0,
              dong: 0
            });
          }
        }
      });
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng), // 지도의 중심좌표
      level: mapCenter.zoomLevel, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);


    props.AccomodationList.map((data: any, idx: any) => {
      // console.log(data.name + idx);
      // 제거
      // removeMarker();
      let placePosition = new kakao.maps.LatLng(
          data.latitude,
          data.longitude
      );
      addMarker(placePosition,idx, data.type, data.price);
    });
    kakao.maps.event.addListener(map, "dragend", function () {
      // console.log(map.getBounds().toString());
      locationToAddress(map.getCenter(),map.getLevel());
      // removeMarker();
      var swLatLng = map.getBounds().getSouthWest();
      var neLatLng = map.getBounds().getNorthEast();
      // console.log("[" + swLatLng.getLat() + ", " + swLatLng.getLng() + "], [" + neLatLng.getLat() + ", " + neLatLng.getLng() + "]");
      axios.get('http://ec2-43-200-177-199.ap-northeast-2.compute.amazonaws.com:8080/places', {
        params: {
          latitudeStart: swLatLng.getLat(),
          latitudeEnd: neLatLng.getLat(),
          longitudeStart: swLatLng.getLng(),
          longitudeEnd: neLatLng.getLng()
        }
      }).then(function(response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      }).then(function() {

      });
    });

    function addMarker(position: any, idx: number, marker_type: string, price:any) {
      // @ts-ignore
      var imageSrc = AccomodationTypeMarker[marker_type], // 마커 이미지 url, 스프라이트 이미지
        imageSize = new kakao.maps.Size(98, 31), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(98, 31), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, 0), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(49, 12.5), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
          // text: "텍스트를 표시할 수 있어요!",
        });

      var content = '<div class ="label">' +
          '<span class="center" style="color:white">₩'+
          price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'</span>' +
          '</div>';


      marker.setMap(map); // 지도 위에 마커를 표출
      markers.push(marker); // 배열에 생성된 마커를 추가
      // clusterer.addMarkers(markers);

      var customOverlay = new kakao.maps.CustomOverlay({
        position:position,
        content:content
      });
      customOverlay.setMap(map);

      kakao.maps.event.addListener(marker, "mouseover", function () {
        console.log(idx + "mouse over");
      });
      return marker;
    }
    //
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     setState((prev) => ({
    //       ...prev,
    //       center: {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       },
    //       isLoading: false,
    //     }));
    //     let placePosition = new kakao.maps.LatLng(
    //       state.center.lat,
    //       state.center.lng
    //     );
    //     console.log(state);
    //     const marker = addMarker(placePosition, 0, undefined);
    //     const bounds = new kakao.maps.LatLngBounds();
    //     bounds.extend(placePosition);
    //     map.setBounds(bounds);
    //   });
    // }
    //
    // // 장소 검색 객체를 생성
    // const ps = new kakao.maps.services.Places();

    // // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    // const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // // 키워드로 장소를 검색합니다
    // searchPlaces();

    // // 키워드 검색을 요청하는 함수
    // function searchPlaces() {
    //   let keyword = props.searchKeyword;

    //   if (!keyword.replace(/^\s+|\s+$/g, "")) {
    //     console.log("키워드를 입력해주세요!");
    //     return false;
    //   }

    //   // 장소검색 객체를 통해 키워드로 장소검색을 요청
    //   ps.keywordSearch(keyword, placesSearchCB);
    // }

    // // 장소검색이 완료됐을 때 호출되는 콜백함수
    // function placesSearchCB(data: any, status: any, pagination: any) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 정상적으로 검색이 완료됐으면
    //     // 검색 목록과 마커를 표출
    //     displayPlaces(data);

    //     // 페이지 번호를 표출
    //     displayPagination(pagination);

    //   } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    //     alert('검색 결과가 존재하지 않습니다.');
    //     return;
    //   } else if (status === kakao.maps.services.Status.ERROR) {
    //     alert('검색 결과 중 오류가 발생했습니다.');
    //     return;
    //   }
    // }

    // // 검색 결과 목록과 마커를 표출하는 함수
    // function displayPlaces(places: string | any[]) {
    //   const listEl = document.getElementById('places-list'),
    //     resultEl = document.getElementById('search-result'),
    //     fragment = document.createDocumentFragment(),
    //     bounds = new kakao.maps.LatLngBounds();

    //   // 검색 결과 목록에 추가된 항목들을 제거
    //   listEl && removeAllChildNods(listEl);

    //   // 지도에 표시되고 있는 마커를 제거
    //   removeMarker();

    //   for (var i = 0; i < places.length; i++) {
    //     // 마커를 생성하고 지도에 표시
    //     let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
    //       marker = addMarker(placePosition, i, undefined),
    //       itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가
    //     bounds.extend(placePosition);
    //     // 마커와 검색결과 항목에 mouseover 했을때
    //     // 해당 장소에 인포윈도우에 장소명을 표시
    //     // mouseout 했을 때는 인포윈도우를 닫기
    //     (function (marker, title) {
    //       kakao.maps.event.addListener(marker, 'mouseover', function () {
    //         displayInfowindow(marker, title);
    //       });

    //       kakao.maps.event.addListener(marker, 'mouseout', function () {
    //         infowindow.close();
    //       });

    //       itemEl.onmouseover = function () {
    //         displayInfowindow(marker, title);
    //       };

    //       itemEl.onmouseout = function () {
    //         infowindow.close();
    //       };
    //     })(marker, places[i].place_name);

    //     fragment.appendChild(itemEl);
    //   }

    //   // 검색결과 항목들을 검색결과 목록 Element에 추가
    //   listEl && listEl.appendChild(fragment);
    //   if (resultEl) {
    //     resultEl.scrollTop = 0;
    //   }

    //   // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    //   map.setBounds(bounds);
    // }

    // // 검색결과 항목을 Element로 반환하는 함수
    // function getListItem(index: number, places: placeType) {

    //   const el = document.createElement('li');
    //   let itemStr = `
    //       <div class="info">
    //         <span class="marker marker_${index + 1}">
    //           ${index + 1}
    //         </span>
    //         <a href="${places.place_url}">
    //           <h5 class="info-item place-name">${places.place_name}</h5>
    //           ${places.road_address_name
    //       ? `<span class="info-item road-address-name">
    //                 ${places.road_address_name}
    //                </span>
    //                <span class="info-item address-name">
    //              	 ${places.address_name}
    //            	   </span>`
    //       : `<span class="info-item address-name">
    //          	     ${places.address_name}
    //               </span>`
    //     }
    //           <span class="info-item tel">
    //             ${places.phone}
    //           </span>
    //         </a>
    //       </div>
    //       `

    //   el.innerHTML = itemStr;
    //   el.className = 'item';

    //   return el;
    // }

    // // 검색결과 목록 하단에 페이지번호를 표시는 함수
    // function displayPagination(pagination: { last: number; current: number; gotoPage: (arg0: number) => void }) {
    //   const paginationEl = document.getElementById('pagination') as HTMLElement;
    //   let fragment = document.createDocumentFragment();
    //   let i;

    //   // 기존에 추가된 페이지번호를 삭제
    //   while (paginationEl.hasChildNodes()) {
    //     paginationEl.lastChild &&
    //       paginationEl.removeChild(paginationEl.lastChild);
    //   }

    //   for (i = 1; i <= pagination.last; i++) {
    //     const el = document.createElement('a') as HTMLAnchorElement;
    //     el.href = "#";
    //     el.innerHTML = i.toString();

    //     if (i === pagination.current) {
    //       el.className = 'on';
    //     } else {
    //       el.onclick = (function (i) {
    //         return function () {
    //           pagination.gotoPage(i);
    //         }
    //       })(i);
    //     }

    //     fragment.appendChild(el);
    //   }
    //   paginationEl.appendChild(fragment);
    // }

    // // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
    // // 인포윈도우에 장소명을 표시
    // function displayInfowindow(marker: any, title: string) {
    //   const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';

    //   infowindow.setContent(content);
    //   infowindow.open(map, marker);
    // }

    // // 검색결과 목록의 자식 Element를 제거하는 함수
    // function removeAllChildNods(el: HTMLElement) {
    //   while (el.hasChildNodes()) {
    //     el.lastChild &&
    //       el.removeChild(el.lastChild);
    //   }
    // }

    // 지도 타입 변경 컨트롤을 생성한다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도에 확대 축소 컨트롤을 생성한다
    const zoomControl = new kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, [selectedboxAddress]);

  return (
    <div className="map-container">
      <div id="map" className="map" />
    </div>
  );
};

export default Map;
