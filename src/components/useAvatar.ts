import { useState, useEffect } from "react";
import { useBase64 } from "./useBase64";

const bodys: ImageFolder = import.meta.glob(
  "/src/assets/monkey/body/*.svg"
) as ImageFolder;
const backgrounds: ImageFolder = import.meta.glob(
  "/src/assets/monkey/background/*.svg"
) as ImageFolder;
const eyes: ImageFolder = import.meta.glob(
  "/src/assets/monkey/eyes/*.svg"
) as ImageFolder;
const heads: ImageFolder = import.meta.glob(
  "/src/assets/monkey/head/*.svg"
) as ImageFolder;
const mouths: ImageFolder = import.meta.glob(
  "/src/assets/monkey/mouth/*.svg"
) as ImageFolder;
const wukongs: ImageFolder = import.meta.glob(
  "/src/assets/monkey/wukong/*.svg"
) as ImageFolder;
const extras: ImageFolder = import.meta.glob(
  "/src/assets/monkey/extras/*.svg"
) as ImageFolder;

type ImageFolder = Record<string, () => Promise<{ default: string }>>;

type AttrTypes = {
  trait_type: string;
  value: string;
};
export default function useAvatar() {
  const [imgs, setImgs] = useState<string[]>([]);
  const [attr, setAttr] = useState<AttrTypes[]>([]);
  const [name, setName] = useState<string>("");
  const { encodeBase64 } = useBase64();

  const imageFolders: Record<string, ImageFolder> = {
    wukong: wukongs,
    head: heads,
    eyes: eyes,
    body: bodys,
    extras,
    mouth: mouths,
    background: backgrounds,
  };

  async function getRandomImage(folder: ImageFolder): Promise<string | null> {
    const keys = Object.keys(folder);
    if (keys.length === 0) return null;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const module = await folder[randomKey]();
    return module.default;
  }

  async function getRandomCombination(): Promise<string[]> {
    const results: (string | null)[] = [];
    const backgroundImage = await getRandomImage(imageFolders.background);
    results.push(backgroundImage);
    const wukongImage = await getRandomImage(imageFolders.wukong);
    results.push(wukongImage);

    const headImage =
      Math.random() > 0.5 ? await getRandomImage(imageFolders.head) : null;
    const eyesImage =
      Math.random() > 0.5 ? await getRandomImage(imageFolders.eyes) : null;
    const bodyImage =
      Math.random() > 0.5 ? await getRandomImage(imageFolders.body) : null;
    const extrasImage =
      Math.random() > 0.5 ? await getRandomImage(imageFolders.extras) : null;
    const mouthImage =
      Math.random() > 0.5 ? await getRandomImage(imageFolders.mouth) : null;
    results.push(headImage, eyesImage, bodyImage, extrasImage, mouthImage);
    return results.filter((i) => i !== null) as string[];
  }

  const getAvatar = async (): Promise<void> => {
    const imgList = await getRandomCombination();
    const attributes = imgList.map((i) => {
      const item = decodeURIComponent(i).split("/").pop()?.split("=");
      const [trait_type, value] = item || [];
      return { trait_type, value: value.split(".")[0] };
    });
    const fileName = encodeBase64(JSON.stringify(attributes));
    setName(fileName);
    setAttr(attributes);
    setImgs(imgList);
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return { imgs, getAvatar, attr, name };
}
