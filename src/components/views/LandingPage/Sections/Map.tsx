import React, { useEffect, useState } from "react";
import { setConstantValue, setSyntheticLeadingComments } from "typescript";
import { propsType } from "../LandingPage";
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

const Map = (props: any) => {
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
  } = useGlobalContext();

  function removeMarker() {
    console.log("removeMarker");
    console.log(markers);
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
    console.log(url);
    return fetch(url, {
      headers: {
        Authorization:
          "KakaoAK " + process.env.REACT_APP_REST_API_KAKAO_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json != undefined) {
          console.log({
            sido: json.documents[0].code.substring(0, 2),
            sigungu: json.documents[0].code.substring(2, 5),
            dong: json.documents[0].code.substring(5, 8),
          });
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
      console.log("maplevel", level);
      removeMarker();
      if (level <= 3) {
        const url = "http://fullbang.kr:8080/places";
        const now = new Date();
        const date =
          now.getFullYear() +
          "-" +
          ("00" + (now.getMonth() + 1)).slice(-2) +
          "-" +
          ("00" + (now.getDate() - 1)).slice(-2);
        const params = {
          placeType: "MOTEL",
          inputDate: date,
          latitudeStart: map.getBounds().getSouthWest().getLat(),
          latitudeEnd: map.getBounds().getNorthEast().getLat(),
          longitudeStart: map.getBounds().getSouthWest().getLng(),
          longitudeEnd: map.getBounds().getNorthEast().getLng(),
        };
        const response = await axiosGetplace(url, params);
        response.data.map((data: any, idx: number) => {
          let placePosition = new kakao.maps.LatLng(
            data.latitude,
            data.longitude
          );
          addMarker(placePosition, idx, "MOTEL", Math.floor(data.mean));
        });
      } else if (level <= 6) {
        // 동 평균
        const url = "http://fullbang.kr:8080/product/inRange/marketPrice/3";
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
            idx,
            "PRICE",
            Math.floor(data.mean),
            data.addressInfoDto.region3DepthName
          );
        });
      } else if (level <= 8) {
        // 구평균
        const url = "http://fullbang.kr:8080/product/inRange/marketPrice/2";
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
            idx,
            "PRICE",
            Math.floor(data.mean),
            data.addressInfoDto.region2DepthName
          );
        });
      } else {
        // 시평균
        const url = "http://fullbang.kr:8080/product/inRange/marketPrice/1";
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
            idx,
            "PRICE",
            Math.floor(data.mean),
            data.addressInfoDto.region1DepthName
          );
        });
      }
    };
    kakao.maps.event.addListener(map, "dragend", function () {
      locationToAddress(map.getCenter(), map.getLevel());
      console.log("drag_end", map.getLevel());
      console.log(map.getBounds());
      removeMarker();
      drawMarker();
    });
    kakao.maps.event.addListener(map, "zoom_changed", function () {
      console.log("zoom_changed", map.getLevel());
      removeMarker();
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
      if (marker_type == "PRICE") {
        var content =
          '<div class ="label">' +
          '<span class="center" style="color:black">' +
          name +
          "₩" +
          priceThousandComma +
          "</span>" +
          "</div>";
      } else {
        var content =
          '<div class ="label">' +
          '<span class="center" style="color:white">₩' +
          priceThousandComma +
          "</span>" +
          "</div>";
      }

      marker.setMap(map); // 지도 위에 마커를 표출
      markers.push(marker); // 배열에 생성된 마커를 추가
      // clusterer.addMarkers(markers);

      var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
      });
      customOverlay.setMap(map);
      customoverlays.push(customOverlay);

      kakao.maps.event.addListener(marker, "mouseover", function () {
        console.log(idx + "mouse over");
      });
      kakao.maps.event.addListener(marker, "click", function () {
        console.log(idx + "clicked");
        switchMapDetail();
      });
    }

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

// var marketPrice = [
//   {
//     mean: 53800.0,
//     minMeanOfRange: 50448.839405021994,
//     maxMeanOfRange: 57151.160594978006,
//     address_code: 11710,
//   },

//   {
//     mean: 68018.8679245283,
//     minMeanOfRange: 58510.690118961946,
//     maxMeanOfRange: 77527.04573009466,
//     address_code: 11545,
//   },

//   {
//     mean: 44133.333333333336,
//     minMeanOfRange: 38368.6276217865,
//     maxMeanOfRange: 49898.03904488017,
//     address_code: 11530,
//   },

//   {
//     mean: 44760.54460093897,
//     minMeanOfRange: 41433.01401849619,
//     maxMeanOfRange: 48088.07518338175,
//     address_code: 11740,
//   },

//   {
//     mean: 44948.717948717946,
//     minMeanOfRange: 41389.03518883603,
//     maxMeanOfRange: 48508.40070859986,
//     address_code: 11350,
//   },

//   {
//     mean: 43514.28571428572,
//     minMeanOfRange: 37959.161521254566,
//     maxMeanOfRange: 49069.40990731687,
//     address_code: 11215,
//   },

//   {
//     mean: 63447.36842105263,
//     minMeanOfRange: 54940.19132841491,
//     maxMeanOfRange: 71954.54551369035,
//     address_code: 11440,
//   },

//   {
//     mean: 45861.51982378855,
//     minMeanOfRange: 43255.60574858969,
//     maxMeanOfRange: 48467.43389898741,
//     address_code: 11110,
//   },

//   {
//     mean: 46103.62694300518,
//     minMeanOfRange: 43044.46292586964,
//     maxMeanOfRange: 49162.79096014073,
//     address_code: 11410,
//   },

//   {
//     mean: 48833.333333333336,
//     minMeanOfRange: 42889.58568154426,
//     maxMeanOfRange: 54777.08098512241,
//     address_code: 11140,
//   },

//   {
//     mean: 63920.21857923497,
//     minMeanOfRange: 53690.36395394361,
//     maxMeanOfRange: 74150.07320452633,
//     address_code: 11560,
//   },

//   {
//     mean: 85211.11111111111,
//     minMeanOfRange: 58830.90423374319,
//     maxMeanOfRange: 111591.31798847903,
//     address_code: 11170,
//   },

//   {
//     mean: 41111.11111111111,
//     minMeanOfRange: 34115.24127331538,
//     maxMeanOfRange: 48106.980948906836,
//     address_code: 11590,
//   },

//   {
//     mean: 43747.47474747475,
//     minMeanOfRange: 41205.893452338765,
//     maxMeanOfRange: 46289.05604261073,
//     address_code: 11620,
//   },

//   {
//     mean: 42242.23602484472,
//     minMeanOfRange: 39298.17322914078,
//     maxMeanOfRange: 45186.29882054866,
//     address_code: 11260,
//   },

//   {
//     mean: 41843.537414965984,
//     minMeanOfRange: 39039.638499034205,
//     maxMeanOfRange: 44647.43633089776,
//     address_code: 11230,
//   },

//   {
//     mean: 30611.11111111111,
//     minMeanOfRange: 25590.072438158946,
//     maxMeanOfRange: 35632.14978406327,
//     address_code: 11470,
//   },

//   {
//     mean: 44115.87982832618,
//     minMeanOfRange: 40582.99414001201,
//     maxMeanOfRange: 47648.76551664035,
//     address_code: 11500,
//   },

//   {
//     mean: 66912.5,
//     minMeanOfRange: 48504.79078356367,
//     maxMeanOfRange: 85320.20921643633,
//     address_code: 11290,
//   },

//   {
//     mean: 40043.47826086957,
//     minMeanOfRange: 34456.0782828822,
//     maxMeanOfRange: 45630.87823885694,
//     address_code: 11320,
//   },

//   {
//     mean: 51846.153846153844,
//     minMeanOfRange: 44024.99631266771,
//     maxMeanOfRange: 59667.31137963998,
//     address_code: 11380,
//   },

//   {
//     mean: 41000.0,
//     minMeanOfRange: 34792.35665240073,
//     maxMeanOfRange: 47207.64334759927,
//     address_code: 11200,
//   },

//   {
//     mean: 49283.82352941176,
//     minMeanOfRange: 44674.52773311559,
//     maxMeanOfRange: 53893.119325707936,
//     address_code: 11305,
//   },

//   {
//     mean: 57756.75675675676,
//     minMeanOfRange: 44922.113683126976,
//     maxMeanOfRange: 70591.39983038655,
//     address_code: 11650,
//   },

//   {
//     mean: 70742.37804878049,
//     minMeanOfRange: 66151.17446751265,
//     maxMeanOfRange: 75333.58163004833,
//     address_code: 11680,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710108,
//   },

//   {
//     mean: 52853.403141361254,
//     minMeanOfRange: 49707.1022809195,
//     maxMeanOfRange: 55999.70400180301,
//     address_code: 11710111,
//   },

//   {
//     mean: 51875.0,
//     minMeanOfRange: 37914.56763294918,
//     maxMeanOfRange: 65835.43236705082,
//     address_code: 11710106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710112,
//   },

//   {
//     mean: 55742.574257425746,
//     minMeanOfRange: 47853.509066678525,
//     maxMeanOfRange: 63631.639448172966,
//     address_code: 11710101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11710103,
//   },

//   {
//     mean: 66750.0,
//     minMeanOfRange: 51547.754935536665,
//     maxMeanOfRange: 81952.24506446334,
//     address_code: 11545101,
//   },

//   {
//     mean: 79347.82608695653,
//     minMeanOfRange: 64498.16873407507,
//     maxMeanOfRange: 94197.48343983799,
//     address_code: 11545102,
//   },

//   {
//     mean: 44500.0,
//     minMeanOfRange: 33481.208414712615,
//     maxMeanOfRange: 55518.791585287385,
//     address_code: 11545103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530106,
//   },

//   {
//     mean: 48125.0,
//     minMeanOfRange: 37176.83020432182,
//     maxMeanOfRange: 59073.16979567818,
//     address_code: 11530102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530101,
//   },

//   {
//     mean: 42681.818181818184,
//     minMeanOfRange: 36006.077143760114,
//     maxMeanOfRange: 49357.55921987625,
//     address_code: 11530108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11530112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11740110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11740102,
//   },

//   {
//     mean: 51168.831168831166,
//     minMeanOfRange: 44240.01200997457,
//     maxMeanOfRange: 58097.65032768776,
//     address_code: 11740105,
//   },

//   {
//     mean: 40416.333333333336,
//     minMeanOfRange: 31143.67400220612,
//     maxMeanOfRange: 49688.99266446055,
//     address_code: 11740106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11740101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11740103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11740108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11740107,
//   },

//   {
//     mean: 41201.6129032258,
//     minMeanOfRange: 37721.03514093351,
//     maxMeanOfRange: 44682.190665518094,
//     address_code: 11740109,
//   },

//   {
//     mean: 51500.0,
//     minMeanOfRange: 41124.02582886792,
//     maxMeanOfRange: 61875.97417113208,
//     address_code: 11350103,
//   },

//   {
//     mean: 44781.25,
//     minMeanOfRange: 40960.48974058029,
//     maxMeanOfRange: 48602.01025941971,
//     address_code: 11350105,
//   },

//   {
//     mean: 31250.0,
//     minMeanOfRange: 20089.71886554823,
//     maxMeanOfRange: 42410.28113445177,
//     address_code: 11350102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11350106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11350104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11215104,
//   },

//   {
//     mean: 37250.0,
//     minMeanOfRange: 24168.284707271756,
//     maxMeanOfRange: 50331.715292728244,
//     address_code: 11215103,
//   },

//   {
//     mean: 36166.666666666664,
//     minMeanOfRange: 26200.209961334553,
//     maxMeanOfRange: 46133.12337199878,
//     address_code: 11215109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11215102,
//   },

//   {
//     mean: 40583.333333333336,
//     minMeanOfRange: 28324.715993923724,
//     maxMeanOfRange: 52841.95067274295,
//     address_code: 11215105,
//   },

//   {
//     mean: 50000.0,
//     minMeanOfRange: 41078.74987999419,
//     maxMeanOfRange: 58921.25012000581,
//     address_code: 11215101,
//   },

//   {
//     mean: 32750.0,
//     minMeanOfRange: 25924.601151255378,
//     maxMeanOfRange: 39575.398848744626,
//     address_code: 11215107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440113,
//   },

//   {
//     mean: 47927.7108433735,
//     minMeanOfRange: 42041.71230926876,
//     maxMeanOfRange: 53813.70937747823,
//     address_code: 11440110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440118,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440121,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440123,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440115,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440127,
//   },

//   {
//     mean: 113260.86956521739,
//     minMeanOfRange: 87452.73867294096,
//     maxMeanOfRange: 139069.00045749382,
//     address_code: 11440120,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440125,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440117,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440124,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440126,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440116,
//   },

//   {
//     mean: 81250.0,
//     minMeanOfRange: 55105.503686244025,
//     maxMeanOfRange: 107394.49631375598,
//     address_code: 11440122,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11440112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110146,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110129,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110134,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110148,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110127,
//   },

//   {
//     mean: 46142.5,
//     minMeanOfRange: 35555.22288653423,
//     maxMeanOfRange: 56729.77711346577,
//     address_code: 11110155,
//   },

//   {
//     mean: 54000.0,
//     minMeanOfRange: 44501.043592083064,
//     maxMeanOfRange: 63498.956407916936,
//     address_code: 11110135,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110128,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110176,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110180,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110182,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110131,
//   },

//   {
//     mean: 46252.17391304348,
//     minMeanOfRange: 43024.52938324309,
//     maxMeanOfRange: 49479.81844284387,
//     address_code: 11110137,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110118,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110117,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110116,
//   },

//   {
//     mean: 32000.0,
//     minMeanOfRange: 26596.652889180634,
//     maxMeanOfRange: 37403.34711081937,
//     address_code: 11110153,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110168,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110170,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110171,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110173,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110172,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110151,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110187,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110152,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110184,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110144,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110115,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110140,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110123,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110119,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110142,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110178,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110145,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110124,
//   },

//   {
//     mean: 59000.0,
//     minMeanOfRange: 46875.428804833275,
//     maxMeanOfRange: 71124.57119516672,
//     address_code: 11110175,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110120,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110121,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110186,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110141,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110166,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110160,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110158,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110130,
//   },

//   {
//     mean: 34541.666666666664,
//     minMeanOfRange: 28771.606981260615,
//     maxMeanOfRange: 40311.726352072714,
//     address_code: 11110132,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110159,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110149,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110165,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110133,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110136,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110157,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110154,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110147,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110126,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110138,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110156,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110161,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110163,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110164,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110125,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110105,
//   },

//   {
//     mean: 54285.71428571428,
//     minMeanOfRange: 33764.50574430523,
//     maxMeanOfRange: 74806.92282712334,
//     address_code: 11110174,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110122,
//   },

//   {
//     mean: 53500.0,
//     minMeanOfRange: 39568.13580313101,
//     maxMeanOfRange: 67431.86419686899,
//     address_code: 11110112,
//   },

//   {
//     mean: 34000.0,
//     minMeanOfRange: 25039.562510680633,
//     maxMeanOfRange: 42960.43748931937,
//     address_code: 11110167,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110139,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110177,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110183,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110181,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110169,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110185,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110179,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110143,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110162,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11110150,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410120,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410113,
//   },

//   {
//     mean: 53103.44827586207,
//     minMeanOfRange: 45802.045043952,
//     maxMeanOfRange: 60404.851507772146,
//     address_code: 11410112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410115,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410119,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410117,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410107,
//   },

//   {
//     mean: 44865.85365853659,
//     minMeanOfRange: 41540.9425803739,
//     maxMeanOfRange: 48190.764736699275,
//     address_code: 11410116,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410118,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11410111,
//   },

//   {
//     mean: 44500.0,
//     minMeanOfRange: 36805.11028163641,
//     maxMeanOfRange: 52194.88971836359,
//     address_code: 11140145,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140146,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140115,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140116,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140117,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140118,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140128,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140129,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140130,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140140,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140173,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140174,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140126,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140127,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140164,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140136,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140153,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140119,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140120,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140157,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140166,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140168,
//   },

//   {
//     mean: 67333.33333333333,
//     minMeanOfRange: 15547.994066674422,
//     maxMeanOfRange: 119118.67259999223,
//     address_code: 11140162,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140147,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140135,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140142,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140154,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140155,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140150,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140151,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140148,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140149,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140169,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140172,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140160,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140134,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140156,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140143,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140144,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140131,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140161,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140167,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140152,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140141,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140171,
//   },

//   {
//     mean: 38181.818181818184,
//     minMeanOfRange: 28080.879081975898,
//     maxMeanOfRange: 48282.757281660466,
//     address_code: 11140159,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140124,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140125,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140158,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140132,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140133,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140170,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140137,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140138,
//   },

//   {
//     mean: 49000.0,
//     minMeanOfRange: 37774.82828639134,
//     maxMeanOfRange: 60225.17171360866,
//     address_code: 11140139,
//   },

//   {
//     mean: 58529.41176470588,
//     minMeanOfRange: 47239.865400312854,
//     maxMeanOfRange: 69818.9581290989,
//     address_code: 11140165,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140121,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140122,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140123,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11140163,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560117,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560112,
//   },

//   {
//     mean: 35000.0,
//     minMeanOfRange: 25200.0,
//     maxMeanOfRange: 44800.0,
//     address_code: 11560113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560115,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560116,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560133,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560118,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560119,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560120,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560121,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560122,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560123,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560124,
//   },

//   {
//     mean: 47187.5,
//     minMeanOfRange: 37465.56975264814,
//     maxMeanOfRange: 56909.43024735186,
//     address_code: 11560132,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560134,
//   },

//   {
//     mean: 48333.333333333336,
//     minMeanOfRange: 35752.07154652721,
//     maxMeanOfRange: 60914.595120139464,
//     address_code: 11560125,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560126,
//   },

//   {
//     mean: 68571.42857142857,
//     minMeanOfRange: 25206.92696008752,
//     maxMeanOfRange: 111935.9301827696,
//     address_code: 11560127,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560128,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560129,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560130,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560131,
//   },

//   {
//     mean: 179444.44444444444,
//     minMeanOfRange: 122935.78529760757,
//     maxMeanOfRange: 235953.1035912813,
//     address_code: 11560110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560103,
//   },

//   {
//     mean: 50934.117647058825,
//     minMeanOfRange: 42274.31235192088,
//     maxMeanOfRange: 59593.92294219677,
//     address_code: 11560104,
//   },

//   {
//     mean: 71500.0,
//     minMeanOfRange: 33624.36446814194,
//     maxMeanOfRange: 109375.63553185806,
//     address_code: 11560105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560106,
//   },

//   {
//     mean: 36000.0,
//     minMeanOfRange: 30875.733777407735,
//     maxMeanOfRange: 41124.26622259227,
//     address_code: 11560107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11560109,
//   },

//   {
//     mean: 164900.0,
//     minMeanOfRange: 105048.30485051684,
//     maxMeanOfRange: 224751.69514948316,
//     address_code: 11170104,
//   },

//   {
//     mean: 49250.0,
//     minMeanOfRange: 33806.25247875374,
//     maxMeanOfRange: 64693.74752124626,
//     address_code: 11170105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170120,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170132,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170122,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170136,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170115,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170133,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170123,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170121,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170126,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170127,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170135,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170117,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170118,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170129,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170130,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170134,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170116,
//   },

//   {
//     mean: 39700.0,
//     minMeanOfRange: 28025.077747582214,
//     maxMeanOfRange: 51374.92225241779,
//     address_code: 11170109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170124,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170125,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170128,
//   },

//   {
//     mean: 56250.0,
//     minMeanOfRange: 41072.84817562926,
//     maxMeanOfRange: 71427.15182437074,
//     address_code: 11170131,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11170119,
//   },

//   {
//     mean: 30000.0,
//     minMeanOfRange: 19605.53031655775,
//     maxMeanOfRange: 40394.46968344225,
//     address_code: 11170101,
//   },

//   {
//     mean: 32500.0,
//     minMeanOfRange: 22398.391217236735,
//     maxMeanOfRange: 42601.608782763265,
//     address_code: 11590101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11590108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11590106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11590104,
//   },

//   {
//     mean: 43571.42857142857,
//     minMeanOfRange: 35502.971469850854,
//     maxMeanOfRange: 51639.88567300629,
//     address_code: 11590107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11590103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11590102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11590109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11590105,
//   },

//   {
//     mean: 49129.032258064515,
//     minMeanOfRange: 42599.46109909938,
//     maxMeanOfRange: 55658.60341702965,
//     address_code: 11620103,
//   },

//   {
//     mean: 43166.666666666664,
//     minMeanOfRange: 39230.864258949456,
//     maxMeanOfRange: 47102.46907438387,
//     address_code: 11620101,
//   },

//   {
//     mean: 42514.01869158878,
//     minMeanOfRange: 38866.129066383866,
//     maxMeanOfRange: 46161.9083167937,
//     address_code: 11620102,
//   },

//   {
//     mean: 40857.142857142855,
//     minMeanOfRange: 35508.49816899988,
//     maxMeanOfRange: 46205.78754528583,
//     address_code: 11260105,
//   },

//   {
//     mean: 35942.857142857145,
//     minMeanOfRange: 31700.92248989513,
//     maxMeanOfRange: 40184.79179581916,
//     address_code: 11260101,
//   },

//   {
//     mean: 39263.15789473684,
//     minMeanOfRange: 33402.478161638006,
//     maxMeanOfRange: 45123.83762783567,
//     address_code: 11260104,
//   },

//   {
//     mean: 49615.38461538462,
//     minMeanOfRange: 43521.072553435326,
//     maxMeanOfRange: 55709.69667733391,
//     address_code: 11260102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11260106,
//   },

//   {
//     mean: 35833.333333333336,
//     minMeanOfRange: 26763.797431123046,
//     maxMeanOfRange: 44902.86923554362,
//     address_code: 11260103,
//   },

//   {
//     mean: 44757.57575757576,
//     minMeanOfRange: 37884.26729888815,
//     maxMeanOfRange: 51630.88421626337,
//     address_code: 11230105,
//   },

//   {
//     mean: 43000.0,
//     minMeanOfRange: 31371.400772234003,
//     maxMeanOfRange: 54628.599227766,
//     address_code: 11230101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11230102,
//   },

//   {
//     mean: 32000.0,
//     minMeanOfRange: 26243.80333900934,
//     maxMeanOfRange: 37756.19666099066,
//     address_code: 11230110,
//   },

//   {
//     mean: 37277.77777777778,
//     minMeanOfRange: 32942.95288411592,
//     maxMeanOfRange: 41612.60267143964,
//     address_code: 11230106,
//   },

//   {
//     mean: 52708.333333333336,
//     minMeanOfRange: 46074.225556444995,
//     maxMeanOfRange: 59342.441110221676,
//     address_code: 11230104,
//   },

//   {
//     mean: 31000.0,
//     minMeanOfRange: 22501.64251163791,
//     maxMeanOfRange: 39498.35748836209,
//     address_code: 11230103,
//   },

//   {
//     mean: 37916.666666666664,
//     minMeanOfRange: 26169.24476667957,
//     maxMeanOfRange: 49664.08856665376,
//     address_code: 11230107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11230108,
//   },

//   {
//     mean: 39785.71428571428,
//     minMeanOfRange: 34326.515626570246,
//     maxMeanOfRange: 45244.91294485832,
//     address_code: 11230109,
//   },

//   {
//     mean: 27000.0,
//     minMeanOfRange: 19916.15217554753,
//     maxMeanOfRange: 34083.847824452474,
//     address_code: 11470102,
//   },

//   {
//     mean: 33500.0,
//     minMeanOfRange: 26992.032575373476,
//     maxMeanOfRange: 40007.96742462652,
//     address_code: 11470103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11470101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11500113,
//   },

//   {
//     mean: 46666.666666666664,
//     minMeanOfRange: 39201.62054622997,
//     maxMeanOfRange: 54131.71278710336,
//     address_code: 11500107,
//   },

//   {
//     mean: 43902.32558139535,
//     minMeanOfRange: 40126.41441580815,
//     maxMeanOfRange: 47678.236746982555,
//     address_code: 11500103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290134,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290103,
//   },

//   {
//     mean: 45416.666666666664,
//     minMeanOfRange: 36380.1598952627,
//     maxMeanOfRange: 54453.173438070626,
//     address_code: 11290116,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290117,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290118,
//   },

//   {
//     mean: 70000.0,
//     minMeanOfRange: 58573.14998634497,
//     maxMeanOfRange: 81426.85001365503,
//     address_code: 11290119,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290120,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290130,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290131,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290132,
//   },

//   {
//     mean: 33750.0,
//     minMeanOfRange: 22589.71886554823,
//     maxMeanOfRange: 44910.28113445177,
//     address_code: 11290126,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290127,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290128,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290129,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290115,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290137,
//   },

//   {
//     mean: 39166.666666666664,
//     minMeanOfRange: 27521.40853139817,
//     maxMeanOfRange: 50811.92480193516,
//     address_code: 11290139,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290121,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290122,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290123,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290124,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290125,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11290138,
//   },

//   {
//     mean: 44416.666666666664,
//     minMeanOfRange: 25246.79014800487,
//     maxMeanOfRange: 63586.54318532845,
//     address_code: 11290133,
//   },

//   {
//     mean: 293750.0,
//     minMeanOfRange: 40192.75424472682,
//     maxMeanOfRange: 547307.2457552732,
//     address_code: 11290135,
//   },

//   {
//     mean: 35000.0,
//     minMeanOfRange: 23922.19436089539,
//     maxMeanOfRange: 46077.80563910461,
//     address_code: 11290136,
//   },

//   {
//     mean: 29000.0,
//     minMeanOfRange: 22487.60689147223,
//     maxMeanOfRange: 35512.39310852777,
//     address_code: 11320108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11320106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11320105,
//   },

//   {
//     mean: 43111.11111111111,
//     minMeanOfRange: 36909.434537938,
//     maxMeanOfRange: 49312.787684284216,
//     address_code: 11320107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11380104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11380105,
//   },

//   {
//     mean: 51818.181818181816,
//     minMeanOfRange: 42170.30159569885,
//     maxMeanOfRange: 61466.06204066478,
//     address_code: 11380102,
//   },

//   {
//     mean: 37029.41176470588,
//     minMeanOfRange: 33015.80568697462,
//     maxMeanOfRange: 41043.01784243714,
//     address_code: 11380106,
//   },

//   {
//     mean: 44583.333333333336,
//     minMeanOfRange: 34353.24540242707,
//     maxMeanOfRange: 54813.4212642396,
//     address_code: 11380103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11380101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11380109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11380108,
//   },

//   {
//     mean: 111000.0,
//     minMeanOfRange: 75238.72709200636,
//     maxMeanOfRange: 146761.27290799364,
//     address_code: 11380107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11380110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11380114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200112,
//   },

//   {
//     mean: 42324.32432432433,
//     minMeanOfRange: 35702.04415254337,
//     maxMeanOfRange: 48946.60449610528,
//     address_code: 11200104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200115,
//   },

//   {
//     mean: 30000.0,
//     minMeanOfRange: 9211.060633115503,
//     maxMeanOfRange: 50788.9393668845,
//     address_code: 11200118,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200122,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200108,
//   },

//   {
//     mean: 27500.0,
//     minMeanOfRange: 17105.53031655775,
//     maxMeanOfRange: 37894.46968344225,
//     address_code: 11200102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11200103,
//   },

//   {
//     mean: 41046.51162790698,
//     minMeanOfRange: 32221.37114678417,
//     maxMeanOfRange: 49871.65210902978,
//     address_code: 11305101,
//   },

//   {
//     mean: 41645.833333333336,
//     minMeanOfRange: 35591.61459192122,
//     maxMeanOfRange: 47700.05207474545,
//     address_code: 11305102,
//   },

//   {
//     mean: 55662.83185840708,
//     minMeanOfRange: 48716.796701848325,
//     maxMeanOfRange: 62608.867014965836,
//     address_code: 11305103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11305104,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11650109,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11650107,
//   },

//   {
//     mean: 38916.666666666664,
//     minMeanOfRange: 31787.9259981812,
//     maxMeanOfRange: 46045.40733515213,
//     address_code: 11650101,
//   },

//   {
//     mean: 71842.1052631579,
//     minMeanOfRange: 49702.65063500687,
//     maxMeanOfRange: 93981.55989130892,
//     address_code: 11650108,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11650111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11650102,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11650110,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11650103,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11650104,
//   },

//   {
//     mean: 50833.333333333336,
//     minMeanOfRange: 34760.69152139667,
//     maxMeanOfRange: 66905.97514527,
//     address_code: 11650106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680103,
//   },

//   {
//     mean: 54190.0,
//     minMeanOfRange: 45972.94508481834,
//     maxMeanOfRange: 62407.05491518166,
//     address_code: 11680108,
//   },

//   {
//     mean: 68652.17391304347,
//     minMeanOfRange: 54628.48313343387,
//     maxMeanOfRange: 82675.86469265308,
//     address_code: 11680106,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680118,
//   },

//   {
//     mean: 54647.05882352941,
//     minMeanOfRange: 47591.99972349729,
//     maxMeanOfRange: 61702.117923561535,
//     address_code: 11680105,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680111,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680115,
//   },

//   {
//     mean: 58333.333333333336,
//     minMeanOfRange: 43572.963469453956,
//     maxMeanOfRange: 73093.70319721272,
//     address_code: 11680107,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680110,
//   },

//   {
//     mean: 76160.69868995633,
//     minMeanOfRange: 70117.21351762887,
//     maxMeanOfRange: 82204.1838622838,
//     address_code: 11680101,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680113,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680114,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680112,
//   },

//   {
//     mean: "NaN",
//     minMeanOfRange: "NaN",
//     maxMeanOfRange: "NaN",
//     address_code: 11680104,
//   },
// ];
