export default function mockData() {
  /**
   * 都道府県リストのモックデータ
   */
  const mockPrefectureList = [
    { "prefCode": 1, "prefName": "北海道" },
    { "prefCode": 2, "prefName": "青森県" },
    { "prefCode": 3, "prefName": "岩手県" },
    { "prefCode": 4, "prefName": "宮城県" },
    { "prefCode": 5, "prefName": "秋田県" },
    { "prefCode": 6, "prefName": "山形県" },
    { "prefCode": 7, "prefName": "福島県" },
    { "prefCode": 8, "prefName": "茨城県" },
    { "prefCode": 9, "prefName": "栃木県" },
    { "prefCode": 10, "prefName": "群馬県" }
  ];

  /**
   * RESAS APIで取得出来る人口データのモック
   */
  const mockPopulationResult = {
    "boundaryYear": 2015,
    "data": [
      {
        "label": "総人口",
        "data": [
          { "year": 1960, "value": 1426606 },
          { "year": 1965, "value": 1416591 },
          { "year": 1970, "value": 1427520 },
          { "year": 1975, "value": 1468646 },
          { "year": 1980, "value": 1523907 },
          { "year": 1985, "value": 1524448 },
          { "year": 1990, "value": 1482873 },
          { "year": 1995, "value": 1481663 },
          { "year": 2000, "value": 1475728 },
          { "year": 2005, "value": 1436657 },
          { "year": 2010, "value": 1373339 },
          { "year": 2015, "value": 1308265 },
          { "year": 2020, "value": 1235971 },
          { "year": 2025, "value": 1157332 },
          { "year": 2030, "value": 1076393 },
          { "year": 2035, "value": 993737 },
          { "year": 2040, "value": 908974 },
          { "year": 2045, "value": 823610	}
        ]
      }
    ]
  }

  /**
   * Graphのprops totalPopulation のモックデータ
   */
  const mockTotalPopulation = [
    {
      "prefCode": 2,
      "prefName": "青森県",
      "data": [
        { "year": 1960, "value": 1426606 },
        { "year": 1965, "value": 1416591 },
        { "year": 1970, "value": 1427520 },
        { "year": 1975, "value": 1468646 },
        { "year": 1980, "value": 1523907 },
        { "year": 1985, "value": 1524448 },
        { "year": 1990, "value": 1482873 },
        { "year": 1995, "value": 1481663 },
        { "year": 2000, "value": 1475728 },
        { "year": 2005, "value": 1436657 },
        { "year": 2010, "value": 1373339 },
        { "year": 2015, "value": 1308265 },
        { "year": 2020, "value": 1235971 },
        { "year": 2025, "value": 1157332 },
        { "year": 2030, "value": 1076393 },
        { "year": 2035, "value": 993737 },
        { "year": 2040, "value": 908974 },
        { "year": 2045, "value": 823610	}
      ]
    },
    {
      "prefCode": 3,
      "prefName": "岩手県",
      "data": [
        { "year": 1960, "value": 1448517 },
        { "year": 1965, "value": 1411118 },
        { "year": 1970, "value": 1371383 },
        { "year": 1975, "value": 1385563 },
        { "year": 1980, "value": 1421927 },
        { "year": 1985, "value": 1433611 },
        { "year": 1990, "value": 1416928 },
        { "year": 1995, "value": 1419505 },
        { "year": 2000, "value": 1416180 },
        { "year": 2005, "value": 1385041 },
        { "year": 2010, "value": 1330147 },
        { "year": 2015, "value": 1279594 },
        { "year": 2020, "value": 1224194 },
        { "year": 2025, "value": 1161638 },
        { "year": 2030, "value": 1096141 },
        { "year": 2035, "value": 1028673 },
        { "year": 2040, "value": 957788 },
        { "year": 2045, "value": 884518	}
      ]
    },
    {
      "prefCode": 7,
      "prefName": "福島県",
      "data": [
        { "year": 1960, "value": 2051137 },
        { "year": 1965, "value": 1983754 },
        { "year": 1970, "value": 1946077 },
        { "year": 1975, "value": 1970616 },
        { "year": 1980, "value": 2035272 },
        { "year": 1985, "value": 2080304 },
        { "year": 1990, "value": 2104058 },
        { "year": 1995, "value": 2133592 },
        { "year": 2000, "value": 2126935 },
        { "year": 2005, "value": 2091319 },
        { "year": 2010, "value": 2029064 },
        { "year": 2015, "value": 1914039 },
        { "year": 2020, "value": 1827632 },
        { "year": 2025, "value": 1733103 },
        { "year": 2030, "value": 1635235 },
        { "year": 2035, "value": 1533521 },
        { "year": 2040, "value": 1426392 },
        { "year": 2045, "value": 1314903 }
      ]
    }
  ];

  return { mockPrefectureList, mockPopulationResult, mockTotalPopulation };
};
