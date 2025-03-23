import { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    // console.log("API_BASE_URL 확인:", import.meta.env.VITE_API_BASE_URL);
    axios.get("/api/exhibition") // 백엔드에서 전시 데이터 가져오기
      .then((response) => {
        // console.log("데이터 확인: ", response.data);
        setExhibitions(response.data);
      })
      .catch(error => console.error("데이터 가져오기 실패:", error));
  }, []);

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
              <td>{exhibition.id}</td>
              <td>{exhibition.title}</td>
              <td>{exhibition.genre}</td>
              <td>{exhibition.institution?.name || "없음"}</td>
              <td>{exhibition.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
