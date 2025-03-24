// KakaoMap.jsx
import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const KakaoMap = ({ lat, lng, name }) => {
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 }); // 초기위치
  const { loading, error } = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_API_KEY,
    libraries: ["services"],
  });

  useEffect(() => {
    if (!loading && lat !== null && lng !== null) {
      setPosition({ lat, lng }); // lat, lng 값으로 위치 업데이트
    }
  }, [lat, lng, loading]);

  // 로딩 중일 때나 에러가 있을 경우
  if (loading) return <p>지도를 불러오는 중...</p>;
  if (error) return <p>카카오 맵 로드 실패: {error.message}</p>;

  return (
    <Map center={position} style={{ width: "100%", height: "600px" }} level={3}>
      <MapMarker position={position}>
        <div style={{ padding: "5px", color: "#000" }}>{name || "기본좌표"}</div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;
