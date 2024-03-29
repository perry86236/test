/**
 * 西曆[1900-1-31,2100-12-31]時間區間內的西曆、農曆互轉
 * @charset UTF-8
 * @Author  Jea楊(JJonline@JJonline.Cn)
 * @Version 1.0.0
 * @西曆轉農曆：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
 * @農曆轉西曆：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
 */
var calendar = {
  /**
   * 農曆1900-2100的潤大小信息表
   * @Array Of Property
   * @return Hex
   */
  lunarInfo: [
    0x04bd8,
    0x04ae0,
    0x0a570,
    0x054d5,
    0x0d260,
    0x0d950,
    0x16554,
    0x056a0,
    0x09ad0,
    0x055d2, //1900-1909
    0x04ae0,
    0x0a5b6,
    0x0a4d0,
    0x0d250,
    0x1d255,
    0x0b540,
    0x0d6a0,
    0x0ada2,
    0x095b0,
    0x14977, //1910-1919
    0x04970,
    0x0a4b0,
    0x0b4b5,
    0x06a50,
    0x06d40,
    0x1ab54,
    0x02b60,
    0x09570,
    0x052f2,
    0x04970, //1920-1929
    0x06566,
    0x0d4a0,
    0x0ea50,
    0x06e95,
    0x05ad0,
    0x02b60,
    0x186e3,
    0x092e0,
    0x1c8d7,
    0x0c950, //1930-1939
    0x0d4a0,
    0x1d8a6,
    0x0b550,
    0x056a0,
    0x1a5b4,
    0x025d0,
    0x092d0,
    0x0d2b2,
    0x0a950,
    0x0b557, //1940-1949
    0x06ca0,
    0x0b550,
    0x15355,
    0x04da0,
    0x0a5b0,
    0x14573,
    0x052b0,
    0x0a9a8,
    0x0e950,
    0x06aa0, //1950-1959
    0x0aea6,
    0x0ab50,
    0x04b60,
    0x0aae4,
    0x0a570,
    0x05260,
    0x0f263,
    0x0d950,
    0x05b57,
    0x056a0, //1960-1969
    0x096d0,
    0x04dd5,
    0x04ad0,
    0x0a4d0,
    0x0d4d4,
    0x0d250,
    0x0d558,
    0x0b540,
    0x0b6a0,
    0x195a6, //1970-1979
    0x095b0,
    0x049b0,
    0x0a974,
    0x0a4b0,
    0x0b27a,
    0x06a50,
    0x06d40,
    0x0af46,
    0x0ab60,
    0x09570, //1980-1989
    0x04af5,
    0x04970,
    0x064b0,
    0x074a3,
    0x0ea50,
    0x06b58,
    0x055c0,
    0x0ab60,
    0x096d5,
    0x092e0, //1990-1999
    0x0c960,
    0x0d954,
    0x0d4a0,
    0x0da50,
    0x07552,
    0x056a0,
    0x0abb7,
    0x025d0,
    0x092d0,
    0x0cab5, //2000-2009
    0x0a950,
    0x0b4a0,
    0x0baa4,
    0x0ad50,
    0x055d9,
    0x04ba0,
    0x0a5b0,
    0x15176,
    0x052b0,
    0x0a930, //2010-2019
    0x07954,
    0x06aa0,
    0x0ad50,
    0x05b52,
    0x04b60,
    0x0a6e6,
    0x0a4e0,
    0x0d260,
    0x0ea65,
    0x0d530, //2020-2029
    0x05aa0,
    0x076a3,
    0x096d0,
    0x04afb,
    0x04ad0,
    0x0a4d0,
    0x1d0b6,
    0x0d250,
    0x0d520,
    0x0dd45, //2030-2039
    0x0b5a0,
    0x056d0,
    0x055b2,
    0x049b0,
    0x0a577,
    0x0a4b0,
    0x0aa50,
    0x1b255,
    0x06d20,
    0x0ada0, //2040-2049
    0x14b63,
    0x09370,
    0x049f8,
    0x04970,
    0x064b0,
    0x168a6,
    0x0ea50,
    0x06b20,
    0x1a6c4,
    0x0aae0, //2050-2059
    0x0a2e0,
    0x0d2e3,
    0x0c960,
    0x0d557,
    0x0d4a0,
    0x0da50,
    0x05d55,
    0x056a0,
    0x0a6d0,
    0x055d4, //2060-2069
    0x052d0,
    0x0a9b8,
    0x0a950,
    0x0b4a0,
    0x0b6a6,
    0x0ad50,
    0x055a0,
    0x0aba4,
    0x0a5b0,
    0x052b0, //2070-2079
    0x0b273,
    0x06930,
    0x07337,
    0x06aa0,
    0x0ad50,
    0x14b55,
    0x04b60,
    0x0a570,
    0x054e4,
    0x0d160, //2080-2089
    0x0e968,
    0x0d520,
    0x0daa0,
    0x16aa6,
    0x056d0,
    0x04ae0,
    0x0a9d4,
    0x0a2d0,
    0x0d150,
    0x0f252, //2090-2099
    0x0d520,
  ], //2100

  /**
   * 西曆每個月份的天數普通表
   * @Array Of Property
   * @return Number
   */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
   * 天干地支之天干速查表
   * @Array Of Property
   * @trans ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
   * @return Cn string
   */
  Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

  /**
   * 天干地支之地支速查表
   * @Array Of Property
   * @trans ["子","醜","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
   * @return Cn string
   */
  Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],

  /**
   * 生肖速查表
   * @Array Of Property
   * @trans ["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"]
   * @return Cn string
   */
  Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],

  /**
   * 24節氣速查表
   * @Array Of Property
   * @trans ["小寒","大寒","立春","雨水","驚蟄","春分","清明","穀雨","立夏","小滿","芒種","夏至","小暑","大暑","立秋","處暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
   * @return Cn string
   */
  solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"],

  /**
   * 1900-2100各年的24節氣日期速查表
   * @Array Of Property
   * @return 0x string For splice
   */
  sTermInfo: [
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "9778397bd19801ec9210c965cc920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd09801d98082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd197c36c9210c9274c91aa",
    "97b6b97bd19801ec95f8c965cc920e",
    "97bd09801d98082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec95f8c965cc920e",
    "97bcf97c3598082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd07f595b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "9778397bd19801ec9210c9274c920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd07f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd07f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bd07f1487f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c9274c920e",
    "97bcf7f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c91aa",
    "97b6b97bd197c36c9210c9274c920e",
    "97bcf7f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c920e",
    "97b6b7f0e47f531b0723b0b6fb0722",
    "7f0e37f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36b0b70c9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0787b0721",
    "7f0e27f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c91aa",
    "97b6b7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "977837f0e37f149b0723b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f5307f595b0b0bc920fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "977837f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0723b06bd",
    "7f07e7f0e37f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0723b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0723b06bd",
    "7f07e7f0e37f14998083b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14898082b0723b02d5",
    "7f07e7f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e36665b66aa89801e9808297c35",
    "665f67f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e36665b66a449801e9808297c35",
    "665f67f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e36665b66a449801e9808297c35",
    "665f67f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e26665b66a449801e9808297c35",
    "665f67f0e37f1489801eb072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
  ],

  /**
   * 數字轉中文速查表
   * @Array Of Property
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string
   */
  nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],

  /**
   * 日期轉農曆稱呼速查表
   * @Array Of Property
   * @trans ['初','十','廿','卅']
   * @return Cn string
   */
  nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

  /**
   * 月份轉農曆稱呼速查表
   * @Array Of Property
   * @trans ['正','二','三','四','五','六','七','八','九','十','冬','臘']
   * @return Cn string
   */
  nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],

  /**
   * 中國法定節假日速查表(西曆)(清明節屬24節氣)
   * @Json of Property
   * @trans {"0101" : "元旦節", "0501" : "勞動節", "1001" : "國慶節", "0308" : "婦女節", "0504" : "青年節", "0601" : "兒童節", "0801" : "建軍節"}
   * @return Cn string
   */
  nStr4: {
    "0101": "\u5143\u65e6\u8282", // 西曆1月1日
    "0501": "\u52b3\u52a8\u8282", // 西曆5月1日
    1001: "\u56fd\u5e86\u8282", // 西曆10月1日
    "0308": "\u5987\u5973\u8282", // 西曆3月8日
    "0504": "\u9752\u5e74\u8282", // 西曆5月4日
    "0601": "\u513f\u7ae5\u8282", // 西曆6月1日
    "0801": "\u5efa\u519b\u8282", // 西曆8月1日
  },

  /**
   * 中國法定節假日速查表(農曆)(清明節屬24節氣)
   * @Json of Property
   * @trans {"0101" : "春節", "0505" : "端午節", "0815" : "中秋節"}
   * @return Cn string
   */
  nStr5: {
    "0101": "\u6625\u8282", // 農曆正月初一
    "0505": "\u7aef\u5348\u8282", // 農曆五月初五
    "0815": "\u4e2d\u79cb\u8282", // 農曆八月十五
  },

  /**
   * 休息日速查表
   * @Json of Property
   * @return Json
   */
  leave: {
    2018: {
      "01": ["01", "06", "07", "13", "14", "20", "21", "27", "28"],
      "02": ["03", "04", "10", "15", "16", "17", "18", "19", "20", "21", "25"],
      "03": ["03", "04", "10", "11", "17", "18", "24", "25", "31"],
      "04": ["05", "06", "07", "14", "15", "21", "22", "29", "30"],
      "05": ["01", "05", "06", "12", "13", "19", "20", "26", "27"],
      "06": ["02", "03", "09", "10", "16", "17", "18", "23", "24", "30"],
      "07": ["01", "07", "08", "14", "15", "21", "22", "28", "29"],
      "08": ["04", "05", "11", "12", "18", "19", "25", "26"],
      "09": ["01", "02", "08", "09", "15", "16", "22", "23", "24"],
      10: ["01", "02", "03", "04", "05", "06", "07", "13", "14", "20", "21", "27", "28"],
      11: ["03", "04", "10", "11", "17", "18", "24", "25"],
      12: ["01", "02", "08", "09", "15", "16", "22", "23", "29", "30"],
    },
  },

  /**
   * 獲取農曆y年一整年的總天數
   * @param {Number} y - lunar year
   * @return {Number}
   * @eg:var count = calendar.lYearDays(1987) ;//count=384
   */
  lYearDays: function (y) {
    var i,
      sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += calendar.lunarInfo[y - 1900] & i ? 1 : 0;
    }
    return sum + calendar.leapDays(y);
  },

  /**
   * 獲取農曆y年閏月是哪個月；若y年沒有閏月 則返回0
   * @param {Number} y - lunar year
   * @return {Number} (0-12)
   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
   */
  leapMonth: function (y) {
    //閏字編碼 \u95f0
    return calendar.lunarInfo[y - 1900] & 0xf;
  },

  /**
   * 獲取農曆y年閏月的天數；若該年沒有閏月則返回0
   * @param {Number} y - lunar year
   * @return {Number} (0、29、30)
   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
   */
  leapDays: function (y) {
    if (calendar.leapMonth(y)) {
      return calendar.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
   * 獲取農曆y年m月（非閏月）的總天數，計算m為閏月時的天數請使用leapDays方法
   * @param {Number} y - lunar year
   * @param {Number} m - lunar month
   * @return {Number} (-1、29、30)
   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
   */
  monthDays: function (y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } //月份參數從1至12，參數錯誤返回-1
    return calendar.lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
  },

  /**
   * 獲取西曆y年m月的天數
   * @param {Number} solar Year
   * @param {Number} solar Month
   * @return Number (-1、28、29、30、31)
   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
   */
  solarDays: function (y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } //若參數錯誤 返回-1
    var ms = m - 1;
    if (ms == 1) {
      //2月份的閏平規律測算後確認返回28或29
      return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
    } else {
      return calendar.solarMonth[ms];
    }
  },

  /**
   * 農曆年份轉換為干支紀年
   * @param {Number} y - lunar year
   * @return {String} Cn string
   */
  toGanZhiYear: function (y) {
    var ganKey = (y - 3) % 10;
    var zhiKey = (y - 3) % 12;
    if (ganKey == 0) ganKey = 10; //如果餘數為0則為最後一個天干
    if (zhiKey == 0) zhiKey = 12; //如果餘數為0則為最後一個地支
    return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];
  },

  /**
   * 西曆月、日判斷所屬星座
   * @param {Number} m - solar month
   * @param {Number} d - solar day
   * @return {String} Cn string
   */
  toAstro: function (m, d) {
    var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 23, 22];
    return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "\u5ea7"; //座
  },

  /**
   * 傳入offset偏移量返回干支
   * @param {Number} offset - 相對甲子的偏移量
   * @return {String} Cn string
   */
  toGanZhi: function (offset) {
    return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
  },

  /**
   * 傳入西曆y年獲得該年第n個節氣的西曆日期
   * @param {Number} y - 西曆年(1900-2100)
   * @param {Number} n - 二十四節氣中的第幾個節氣(1~24),從n=1(小寒)算起
   * @return {Number} day
   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   */
  getTerm: function (y, n) {
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (n < 1 || n > 24) {
      return -1;
    }
    var _table = calendar.sTermInfo[y - 1900];
    var _info = [parseInt("0x" + _table.substr(0, 5)).toString(), parseInt("0x" + _table.substr(5, 5)).toString(), parseInt("0x" + _table.substr(10, 5)).toString(), parseInt("0x" + _table.substr(15, 5)).toString(), parseInt("0x" + _table.substr(20, 5)).toString(), parseInt("0x" + _table.substr(25, 5)).toString()];
    var _calday = [
      _info[0].substr(0, 1),
      _info[0].substr(1, 2),
      _info[0].substr(3, 1),
      _info[0].substr(4, 2),

      _info[1].substr(0, 1),
      _info[1].substr(1, 2),
      _info[1].substr(3, 1),
      _info[1].substr(4, 2),

      _info[2].substr(0, 1),
      _info[2].substr(1, 2),
      _info[2].substr(3, 1),
      _info[2].substr(4, 2),

      _info[3].substr(0, 1),
      _info[3].substr(1, 2),
      _info[3].substr(3, 1),
      _info[3].substr(4, 2),

      _info[4].substr(0, 1),
      _info[4].substr(1, 2),
      _info[4].substr(3, 1),
      _info[4].substr(4, 2),

      _info[5].substr(0, 1),
      _info[5].substr(1, 2),
      _info[5].substr(3, 1),
      _info[5].substr(4, 2),
    ];
    return parseInt(_calday[n - 1]);
  },

  /**
   * 傳入農曆數字月份返回漢語通俗表示法
   * @param {Number} m - lunar month
   * @return {String} Cn string
   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='臘月'
   */
  toChinaMonth: function (m) {
    // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1;
    } //若參數錯誤 返回-1
    var s = calendar.nStr3[m - 1];
    s += "\u6708"; //加上月字
    return s;
  },

  /**
   * 傳入農曆日期數字返回漢字表示法
   * @param {Number} d - lunar day
   * @return {String} Cn string
   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
   */
  toChinaDay: function (d) {
    //日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521d\u5341";
        break;
      case 20:
        s = "\u4e8c\u5341";
        break;
        break;
      case 30:
        s = "\u4e09\u5341";
        break;
        break;
      default:
        s = calendar.nStr2[Math.floor(d / 10)];
        s += calendar.nStr1[d % 10];
    }
    return s;
  },

  /**
   * 西曆日期轉生肖(分界線是“立春”)
   * @param {Number} y - solar year
   * @param {Number} m - solar month
   * @param {Number} d - solar day
   * @return {String} Cn string
   * @eg:var animal = calendar.getAnimal(1987, 2, 4) ;//animal='兔'
   */
  getAnimal: function (y, m, d) {
    var term = calendar.getTerm(y, 3); //返回當年第三個節氣[立春]為西曆幾日
    if ((m == 2 && d >= term) || m > 2) {
      return calendar.Animals[(y - 4) % 12];
    }
    return calendar.Animals[(y - 5) % 12];
  },

  /**
   * 西曆日期是否24節氣
   * @param {Number} y - solar year
   * @param {Number} m - solar month
   * @param {Number} d - solar day
   * @return {boolean}
   * @eg:var isTerm = calendar.isTerm(1987, 2, 4) ; // isTerm = true
   */
  isTerm: function (y, m, d) {
    // 當月的兩個節氣
    var firstNode = calendar.getTerm(y, m * 2 - 1); //返回當月第一「節氣」為幾日開始
    var secondNode = calendar.getTerm(y, m * 2); //返回當月第二「節氣」為幾日開始
    //傳入的日期的節氣與否
    var isTerm = false;
    if (firstNode == d) {
      isTerm = true;
    }
    if (secondNode == d) {
      isTerm = true;
    }
    return isTerm;
  },

  /**
   * 獲取西曆日期的24節氣值
   * @param {Number} y - solar year
   * @param {Number} m - solar month
   * @param {Number} d - solar day
   * @return {String} Cn string
   * @eg:var term = calendar.getShowTerm(1987, 2, 4); // term = '立春'
   */
  getShowTerm: function (y, m, d) {
    // 當月的兩個節氣
    var firstNode = calendar.getTerm(y, m * 2 - 1); //返回當月第一個「節氣」為幾日開始
    var secondNode = calendar.getTerm(y, m * 2); //返回當月第二個「節氣」為幾日開始
    //傳入的日期的節氣與否
    var term = null;
    if (firstNode == d) {
      term = calendar.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      term = calendar.solarTerm[m * 2 - 1];
    }
    return term;
  },
  /**
   * 獲取指定西曆日期是一年中的第幾周
   * @param {Number} y - solar year
   * @param {Number} m - solar month
   * @param {Number} d - solar day
   * @return {Number} 第幾周
   */
  getWeekOfYear: function (y, m, d) {
    // 指定日期是一年中的第幾天
    var days = d;
    for (var i = 1; i < m; i++) {
      days += calendar.solarDays(y, i);
    }

    // 指定年份的第一天是星期幾
    var yearFirstDay = new Date(y, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay == 1) {
      week = Math.ceil(days / 7);
    } else {
      days -= 7 - yearFirstDay + 1;
      week = Math.ceil(days / 7) + 1;
    }

    return week;
  },

  /**
   * 傳入西曆年月日獲得詳細的西曆、農曆 JSON object信息
   * @param {Number} y - solar year
   * @param {Number} m - solar month
   * @param {Number} d - solar day
   * @return {JSON} JSON object
   * @eg:console.log(calendar.solar2lunar(1987,11,01));
   */
  solar2lunar: function (y, m, d) {
    //參數區間西曆1900.1.31~2100.12.31
    //年份限定
    if (y < 1900 || y > 2100) {
      return -1;
    }
    //西曆傳參最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    //未傳參;獲得當天
    var objDate = null;
    if (!y) {
      objDate = new Date();
    } else {
      objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i,
      leap = 0,
      temp = 0;
    //修正ymd參數
    var y = objDate.getFullYear(),
      m = objDate.getMonth() + 1,
      d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = calendar.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }

    //是否今天
    var isTodayObj = new Date(),
      isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    //星期幾
    var nWeek = objDate.getDay(),
      cWeek = calendar.nStr1[nWeek];
    //數字表示周幾順應天朝周一開始的慣例
    if (nWeek == 0) {
      nWeek = 7;
    }
    //農曆年
    var year = i;
    var leap = calendar.leapMonth(i); //閏哪個月
    var isLeap = false;

    //效驗閏月
    for (i = 1; i < 13 && offset > 0; i++) {
      //閏月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;
        temp = calendar.leapDays(year); //計算農曆閏月天數
      } else {
        temp = calendar.monthDays(year, i); //計算農曆普通月天數
      }
      //解除閏月
      if (isLeap == true && i == leap + 1) {
        isLeap = false;
      }
      offset -= temp;
    }
    // 閏月導致數組下標重疊取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    //農曆月
    var month = i;
    //農曆日
    var day = offset + 1;
    //天干地支處理
    var gzY = calendar.toGanZhiYear(year);

    // 當月的第一個節氣
    var firstNode = calendar.getTerm(y, m * 2 - 1); //返回當月第一個「節氣」為幾日開始

    // 依據12節氣修正干支月
    var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 指定日期與 1900/1/1 相差天數
    var dayCyclical = Date.UTC(y, m - 1, d, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = calendar.toGanZhi(dayCyclical);
    //該日期所屬的星座
    var astro = calendar.toAstro(m, d);

    //中國法定節假日
    var vacation = null;
    var month_day = (month > 9 ? "" + month : "0" + month) + (day > 9 ? "" + day : "0" + day);
    var m_d = (m > 9 ? "" + m : "0" + m) + (d > 9 ? "" + d : "0" + d);
    var vacation_temp = calendar.nStr5[month_day] || calendar.nStr4[m_d];
    if (vacation_temp) {
      vacation = vacation_temp;
    }

    return {
      lYear: year,
      lMonth: month,
      lDay: day,
      Animal: calendar.getAnimal(y, m, d),
      IMonthCn: (isLeap ? "\u95f0" : "") + calendar.toChinaMonth(month),
      IDayCn: calendar.toChinaDay(day),
      cYear: y,
      cMonth: m,
      cDay: d,
      gzYear: gzY,
      gzMonth: gzM,
      gzDay: gzD,
      isToday: isToday,
      isLeap: isLeap,
      nWeek: nWeek,
      ncWeek: "\u661f\u671f" + cWeek,
      weekOfYear: "\u7b2c" + calendar.getWeekOfYear(y, m, d) + "\u5468",
      isTerm: calendar.isTerm(y, m, d),
      Term: calendar.getShowTerm(y, m, d),
      astro: astro,
      vacation: vacation,
    };
  },

  /**
   * 傳入農曆年月日以及傳入的月份是否閏月獲得詳細的西曆、農曆 JSON object信息
   * @param {Number} y - lunar year
   * @param {Number} m - lunar month
   * @param {Number} [d] - lunar day
   * @param {Boolean} [isLeapMonth] - lunar month is leap or not,如果是農曆閏月賦值true即可.
   * @return {JSON} JSON object
   * @eg:console.log(calendar.lunar2solar(1987,9,10));
   */
  lunar2solar: function (y, m, d, isLeapMonth) {
    //參數區間農曆1900.1.1~2100.12.1
    //年份限定
    if (y < 1900 || y > 2100) {
      return -1;
    }
    //農曆傳參最上限
    if (y == 2100 && m == 12 && d > 1) {
      return -1;
    }

    var isLeapMonth = !!isLeapMonth;
    var leapMonth = calendar.leapMonth(y);
    if (isLeapMonth && leapMonth != m) {
      // 計算得出的閏月與傳參的月份不同
      return -1;
    }

    var day = calendar.monthDays(y, m);
    var _day = day;
    if (isLeapMonth) {
      _day = calendar.leapDays(y, m);
    }
    if (d > _day) {
      // 傳參的日期大於計算得出的農曆當月的天數
      return -1;
    }

    //計算傳入時間相對於農曆1900年正月初一的時間差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += calendar.lYearDays(i);
    }
    for (var i = 1; i < m; i++) {
      if (i == leapMonth) {
        //處理閏月
        offset += calendar.leapDays(y);
      }
      offset += calendar.monthDays(y, i);
    }
    //如果是閏月，需補充該年閏月的前一個月的時差
    if (isLeapMonth) {
      offset += day;
    }
    // 農曆1900年正月初一的西曆時間為1900年1月30日0時0分0秒(該時間也是本農曆的最開始起始點)
    var stmap = Date.UTC(1900, 0, 30, 0, 0, 0);
    var calObj = new Date((offset + d) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return calendar.solar2lunar(cY, cM, cD);
  },
};
let ymd = (y, m, d) => [y, (m > 9 ? "" : "0") + m, (d > 9 ? "" : "0") + d].join("/");
function lunar2time(date_string) {
  let reg = /^([0-9]+)\/([0-9]+)$/;
  let date = new Date();
  let this_year = date.getFullYear();
  let this_month = date.getMonth() + 1;
  let this_day = date.getDate();
  let this_ymd = ymd(this_year, this_month, this_day);

  let lunar_month = date_string.replace(reg, "$1");
  let lunar_day = date_string.replace(reg, "$2");

  let trans_json = calendar.lunar2solar(Number(this_year), Number(lunar_month), Number(lunar_day));
  //   console.log(trans_json);
  let trans_year = trans_json.cYear;
  let trans_month = trans_json.cMonth;
  let trans_day = trans_json.cDay;
  let trans_ymd = ymd(trans_year, trans_month, trans_day);

  let trans_json_2 = calendar.lunar2solar(Number(this_year) + 1, Number(lunar_month), Number(lunar_day));
  //   console.log(trans_json_2);
  let trans_year_2 = trans_json_2.cYear;
  let trans_month_2 = trans_json_2.cMonth;
  let trans_day_2 = trans_json_2.cDay;
  let trans_ymd_2 = ymd(trans_year_2, trans_month_2, trans_day_2);
  return trans_ymd < this_ymd ? trans_ymd_2 : trans_ymd;
}
function term2time(date_string) {
  let reg_2 = /^(小寒|大寒|立春|雨水|驚蟄|春分|清明|穀雨|立夏|小滿|芒種|夏至|小暑|大暑|立秋|處暑|白露|秋分|寒露|霜降|立冬|小雪|大雪|冬至)日$/;
  let text = date_string.replace(reg_2, "$1");
  let arr = ["小寒", "大寒", "立春", "雨水", "驚蟄", "春分", "清明", "穀雨", "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", "處暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
  let month_arr = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 1, 1];
  let index = arr.indexOf(text);
  let date = new Date();
  let this_year = date.getFullYear();
  let this_month = date.getMonth() + 1;
  let this_day = date.getDate();
  let this_ymd = ymd(this_year, this_month, this_day);

  let month = month_arr[index];
  let day = calendar.getTerm(this_year, index + 1);
  let term_ymd = ymd(this_year, month, day);
  let term_ymd_2 = ymd(this_year + 1, month, day);
  return term_ymd < this_ymd ? term_ymd_2 : term_ymd;
}
