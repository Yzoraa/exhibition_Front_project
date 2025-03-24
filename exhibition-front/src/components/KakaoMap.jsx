import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const KakaoMap = ({ lat, lng, name }) => {
  const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
  // console.log('키 발급', apiKey);

  // 카카오 로더로 sdk 불러오기
  useKakaoLoader({appkey: apiKey, libraries: ["services"]})
  // console.log('위도:', typeof lat, lat, '경도:', typeof lng, lng);

  return(
    <Map 
      center={{ lat, lng }} 
      style={{ width: "100%", height: "400px" }}
      level={3} // 지도 확대 레벨 (1: 가장 확대, 14: 가장 축소)
    >
      <MapMarker position={{ lat, lng } }>
        <div style={{ padding: "5px", color: "#000" }}>{name}</div>
      </MapMarker>
    </Map>
  )
};

export default KakaoMap;
