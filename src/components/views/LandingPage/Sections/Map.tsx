import { useEffect } from "react";
import { useGlobalContext } from "../../../../context";
import axios from "axios";
import promotion_marker from "../../../../assets/promotion_marker.png";
import hotel_marker from "../../../../assets/hotel_marker.png";
import motel_marker from "../../../../assets/motel_marker.png";
import pension_marker from "../../../../assets/pension_marker.png";
import camping_marker from "../../../../assets/camping_marker.png";
import price_marker from "../../../../assets/price_marker.png";
import axiosGetinrange from "../../../helper/axiosGetinrange";
import axiosGetplace from "../../../helper/axiosGetplace";

// head에 작성한 Kakao API 불러오기
const { kakao } = window as any;

const Map = () => {
  // 마커를 담는 배열
  let markers: any[] = [];
  let customoverlays: any[] = [];
  const AccomodationTypeMarker = {
    MOTEL: motel_marker,
    PROMOTION: promotion_marker,
    HOTEL: hotel_marker,
    PENSION: pension_marker,
    CAMPING: camping_marker,
    PRICE: price_marker,
  };
  const {
    setSelectedAddressDetail,
    mapCenter,
    selectedboxAddress,
    switchMapDetail,
    setProductLists,
    setSidebarMapDetail,
  } = useGlobalContext();

  function removeMarker() {
    // console.log("removeMarker");
    // console.log(markers);
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    for (let i = 0; i < customoverlays.length; i++) {
      customoverlays[i].setMap(null);
    }
    customoverlays = [];
    markers = [];
  }

  const locationToAddress = (center: any, level: any) => {
    const url =
      "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&y=" +
      center.getLat() +
      "&x=" +
      center.getLng();
    // console.log(url);
    return fetch(url, {
      headers: {
        Authorization:
          "KakaoAK " + process.env.REACT_APP_REST_API_KAKAO_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json !== undefined) {
          // console.log({
          //   sido: json.documents[0].code.substring(0, 2),
          //   sigungu: json.documents[0].code.substring(2, 5),
          //   dong: json.documents[0].code.substring(5, 8),
          // });
          if (level < 7) {
            setSelectedAddressDetail({
              sido: json.documents[0].code.substring(0, 2),
              sigungu: json.documents[0].code.substring(2, 5),
              dong: json.documents[0].code.substring(5, 8),
            });
          } else if (level < 9) {
            setSelectedAddressDetail({
              sido: json.documents[0].code.substring(0, 2),
              sigungu: json.documents[0].code.substring(2, 5),
              dong: 0,
            });
          } else {
            setSelectedAddressDetail({
              sido: json.documents[0].code.substring(0, 2),
              sigungu: 0,
              dong: 0,
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

    const drawMarker = async () => {
      var level = map.getLevel();
      // console.log("maplevel", level);
      removeMarker();
      if (level <= 4) {
        const url = "http://api.fullbang.kr:8080/places";
        const now = new Date();
        const date = // "2022-09-19";
          now.getFullYear() +
          "-" +
          ("00" + (now.getMonth() + 1)).slice(-2) +
          "-" +
          ("00" + (now.getDate() - 1)).slice(-2);
        const params = {
          inputDate: date,
          latitudeStart: map.getBounds().getSouthWest().getLat(),
          latitudeEnd: map.getBounds().getNorthEast().getLat(),
          longitudeStart: map.getBounds().getSouthWest().getLng(),
          longitudeEnd: map.getBounds().getNorthEast().getLng(),
        };
        const response = await axiosGetplace(url, params);
        let realData: any[];
        realData = [];
        response.data.map((data: any, idx: number) => {
          let placePosition = new kakao.maps.LatLng(
            data.latitude,
            data.longitude
          );
          // console.log(data, idx);
          if (data.lowestPrice !== 0 && data.lowestPrice !== -1) {
            addMarker(
              placePosition,
              data.placeId,
              data.placeType,
              Math.floor(data.lowestPrice),
              data.placeName
            );
            realData.push(data);
          }
        });
        // console.log("realData", realData);
        setProductLists(realData);
      } else if (level <= 6) {
        // 동 평균
        const url = "http://api.fullbang.kr:8080/product/inRange/marketPrice/3";
        const now = new Date();
        const date =
          now.getFullYear() +
          "-" +
          ("00" + (now.getMonth() + 1)).slice(-2) +
          "-" +
          ("00" + (now.getDate() - 1)).slice(-2);

        const params = {
          placeType: "MOTEL",
          date: date,
          capacity: 0,
          parkingAvailability: 0,
          latitudeStart: map.getBounds().getSouthWest().getLat(),
          latitudeEnd: map.getBounds().getNorthEast().getLat(),
          longitudeStart: map.getBounds().getSouthWest().getLng(),
          longitudeEnd: map.getBounds().getNorthEast().getLng(),
        };
        const response = await axiosGetinrange(url, params);
        response.data.map((data: any, idx: number) => {
          let placePosition = new kakao.maps.LatLng(
            data.addressInfoDto.latitude,
            data.addressInfoDto.longitude
          );
          if (data.mean !== "NaN") {
            addMarker(
              placePosition,
              data.placeId,
              "PRICE",
              Math.floor(data.mean),
              data.addressInfoDto.region3DepthName
            );
          }
        });
      } else if (level <= 8) {
        // 구평균
        const url = "http://api.fullbang.kr:8080/product/inRange/marketPrice/2";
        const now = new Date();
        const date =
          now.getFullYear() +
          "-" +
          ("00" + (now.getMonth() + 1)).slice(-2) +
          "-" +
          ("00" + (now.getDate() - 1)).slice(-2);

        const params = {
          placeType: "MOTEL",
          date: date,
          capacity: 0,
          parkingAvailability: 0,
          latitudeStart: map.getBounds().getSouthWest().getLat(),
          latitudeEnd: map.getBounds().getNorthEast().getLat(),
          longitudeStart: map.getBounds().getSouthWest().getLng(),
          longitudeEnd: map.getBounds().getNorthEast().getLng(),
        };
        const response = await axiosGetinrange(url, params);
        response.data.map((data: any, idx: number) => {
          let placePosition = new kakao.maps.LatLng(
            data.addressInfoDto.latitude,
            data.addressInfoDto.longitude
          );
          addMarker(
            placePosition,
            data.placeId,
            "PRICE",
            Math.floor(data.mean),
            data.addressInfoDto.region2DepthName
          );
        });
      } else {
        // 시평균
        const url = "http://api.fullbang.kr:8080/product/inRange/marketPrice/1";
        const now = new Date();
        const date =
          now.getFullYear() +
          "-" +
          ("00" + (now.getMonth() + 1)).slice(-2) +
          "-" +
          ("00" + (now.getDate() - 1)).slice(-2);

        const params = {
          placeType: "MOTEL",
          date: date,
          capacity: 0,
          parkingAvailability: 0,
          latitudeStart: map.getBounds().getSouthWest().getLat(),
          latitudeEnd: map.getBounds().getNorthEast().getLat(),
          longitudeStart: map.getBounds().getSouthWest().getLng(),
          longitudeEnd: map.getBounds().getNorthEast().getLng(),
        };
        const response = await axiosGetinrange(url, params);
        response.data.map((data: any, idx: number) => {
          let placePosition = new kakao.maps.LatLng(
            data.addressInfoDto.latitude,
            data.addressInfoDto.longitude
          );
          addMarker(
            placePosition,
            data.placeId,
            "PRICE",
            Math.floor(data.mean),
            data.addressInfoDto.region1DepthName
          );
        });
      }
    };
    kakao.maps.event.addListener(map, "dragend", function () {
      locationToAddress(map.getCenter(), map.getLevel());
      // console.log("drag_end", map.getLevel());
      // console.log(map.getBounds());
      drawMarker();
    });
    kakao.maps.event.addListener(map, "zoom_changed", function () {
      // console.log("zoom_changed", map.getLevel());
      drawMarker();
    });

    function addMarker(
      position: any,
      idx: number,
      marker_type: string,
      price: any,
      name: any = 1
    ) {
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
          position: position,
          image: markerImage,
        });
      const priceThousandComma = price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (marker_type === "PRICE") {
        var content =
          '<div class ="label">' +
          '<div class="center" style="color:black;text-align:center;line-height:1.5em;">' +
          name +
          "</div><div>" +
          // "<br/>" +
          '<div class="center" style="color:black;text-align:center;line-height:0.5em;">' +
          "₩" +
          priceThousandComma +
          "</div>" +
          "</div>";
      } else {
        var content =
          '<div class ="label">' +
          '<span class="center" style="color:white">₩' +
          priceThousandComma +
          "</span>" +
          "</div>";
      }

      marker.setMap(map);
      markers.push(marker);

      var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
      });
      customOverlay.setMap(map);
      customoverlays.push(customOverlay);

      kakao.maps.event.addListener(marker, "mouseover", function () {
        // console.log(idx + "mouse over");
      });
      kakao.maps.event.addListener(marker, "click", function () {
        // console.log(idx + "clicked");
        setSidebarMapDetail(idx, name);
        switchMapDetail();
      });
    }

    // 지도 타입 변경 컨트롤을 생성한다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도에 확대 축소 컨트롤을 생성한다
    const zoomControl = new kakao.maps.ZoomControl();
    drawMarker();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedboxAddress]);

  return (
    <div className="map-container">
      <div id="map" className="map" />
    </div>
  );
};

export default Map;
