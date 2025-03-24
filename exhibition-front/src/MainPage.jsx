import { useEffect, useState } from "react";
import axios from "axios";
import KakaoMap from "./components/KakaoMap";

const MainPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);

  useEffect(() => {
    // console.log("API_BASE_URL 확인:", import.meta.env.VITE_API_BASE_URL);
    axios.get("/api/exhibition") // 백엔드에서 전시 데이터 가져오기
      .then((response) => {
        // console.log("데이터 확인: ", response.data);
        setExhibitions(response.data);
      })
      .catch(error => console.error("데이터 가져오기 실패:", error));
  }, []);
  
  // 지도 보기 버튼 클릭 시 위치 정보 업데이트 
  const handleShowMap = (x) =>{
    console.log('선택한 기관:', x);
    setSelectedExhibition({
      name: x.name,
      lat: parseFloat(x.latitude),
      lng: parseFloat(x.longitude),
    });
  };

  return (
    <div>
      <h2>전시 목록</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>장르</th>
            <th>기관</th>
            <th>기간</th>
          </tr>
        </thead>
        <tbody>
          {exhibitions.map((exhibition) => (
            <tr key={exhibition.id}>
              <td>{exhibition.title}</td>
              <td>{exhibition.genre}</td>
              <td>{exhibition.institution?.name || "없음"}</td>
              <td>{exhibition.period}</td>
              <td>
                <button onClick={() => handleShowMap(exhibition.institution)}>
                  지도 보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedExhibition && (
        <div style={{ height: "550px" }}>
          <h3>{selectedExhibition.name} 위치</h3>
          <KakaoMap
            lat={selectedExhibition.lat}
            lng={selectedExhibition.lng}
            name={selectedExhibition.name}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;