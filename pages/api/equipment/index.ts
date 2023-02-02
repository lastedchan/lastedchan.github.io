import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { load } from "cheerio";
import { EquipItemListType, EquipmentResultType } from "../../../src/constants/types";

export default function equip(request: NextApiRequest, response: NextApiResponse) {
  const domain = "https://maplestory.nexon.com";

  const notFoundCharacter = () => response.status(500).json({ message: "캐릭터를 찾지 못했습니다." });
  const failLoadCharacter = () => response.status(500).json({ message: "기본 정보를 불러오지 못했습니다." });
  const failLoadEquipment = () => response.status(500).json({ message: "장비를 불러오지 못했습니다." });

  axios
    .get(`${domain}/Ranking/World/Total`, {
      params: { w: 254, c: "쫑찮" },
    })
    .then(res => {
      const $ = load(res.data);
      const href = $(".search_com_chk a").attr("href");
      if (href) getCharacter(href.split("?"));
      else notFoundCharacter();
    })
    .catch(notFoundCharacter);

  const getCharacter = ([path, params]: string[]) => {
    axios
      .get(`${domain}${path}?${params}`)
      .then(res => {
        const $ = load(res.data);
        let result: EquipmentResultType = {
          characterImage: $(".char_img img").attr("src"),
          job: $(".tab01_con_wrap > table:nth-child(2) tr:nth-child(1) > td:nth-child(4)").text().split("/")[1],
          ability: $(".tab01_con_wrap > table:nth-child(4) tr:nth-child(10) > td:nth-child(2) > span").html()?.split("<br>").slice(0, 3),
        };
        axios(`${domain}${path}/Equipment?${params}`)
          .then(res => {
            const $ = load(res.data);
            const items = $(".weapon_wrap > .item_pot > li");

            result = {
              ...result,
              typeIndex,
              items: typeIndex.reduce<EquipItemListType>(
                (prev, type, i) =>
                  type
                    ? [
                        ...prev,
                        {
                          type: type,
                          name: $(items[i]).find("img").attr("alt"),
                          src: $(items[i]).find("img").attr("src"),
                          href: $(items[i]).find("a").attr("href"),
                        },
                      ]
                    : prev,
                []
              ),
            };
            result.items?.map(item => {
              console.log(item.href);
              /*axios.get(domain + item.href + "&_=" + +new Date()).then(res => {
                console.log(res.config.url);
              });*/
            });
            response.status(200).json(result);
          })
          .catch(failLoadEquipment);
      })
      .catch(failLoadCharacter);
  };
}

const typeIndex = [
  "ring",
  null,
  "cap",
  null,
  "emblem",
  "ring",
  "pendant",
  "fore head",
  null,
  "badge",
  "ring",
  "pendant",
  "eyeacc",
  "earacc",
  "medal",
  "ring",
  "weapon",
  "clothes",
  "shoulder",
  "sub weapon",
  "poket",
  "belt",
  "pants",
  "gloves",
  "cape",
  null,
  null,
  "shoes",
  "android",
  "heart",
];
