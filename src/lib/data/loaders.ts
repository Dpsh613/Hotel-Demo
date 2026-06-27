import { cache } from "react"; // cache so it wont load on every request.
import { promises as fs } from "fs"; // file system which is built in node - it can read/create/write and delete file.
import path from "path"; // built in which reads/creates path thats better than "data/components/hero.json" as it could break.
import { HeroContent } from "@/types"; // imported interface/ shape of object.
const DATA_DIR = path.join(process.cwd(), "data"); // simply means data directory of the current working directory (which is in this case is the golden crown) lives in data folder.

// ---------------------readjson async function explanation -------------------
// readJson<T> = T means placeholder type, (generic)
// for example in herocontent , <T> becomes <{heroes:HeroContent[]}>

// filePath:string -- what is the file path for herocontent ?? -- data/components/hero.json.. so its a string.

// fallback: T , backup data, if files break it will return fallback.

// return type is = Promise<T> - meaning I will return type T bcs file reading is async.

// try block -- attempt to read the file path and store the content then
// return json = then convert the text into object- In the form of T Type.

// catch block -- if file is missing or invalid json or permission error -- show error
// ---------------------readjson async function explanation -------------------

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

// Components loaders
// HeroSlideShow Component

// --------------------getHeroByslug function explaination -------------------

// getHeroBySlug = cache - creates loaderand wrapping it in react cache
// Promise<HeroContent | null> - either heroContent or null
// await readJson<{ heroes: HeroContent[] } - T becomes - {heroes:HeroCOntnet[] in this case
//  path.join(DATA_DIR, "components", "hero.json") - Dir/data/components/hero.json
//if (!data || !data.heroes) return null - if there is no data or no heroes in data return null  ..

export const getHeroBySlug = cache(
  async (slug: string): Promise<HeroContent | null> => {
    const data = await readJson<{ heroes: HeroContent[] }>(
      path.join(DATA_DIR, "components", "hero.json"),
      { heroes: [] },
    );
    console.log(data);
    console.log(data.heroes);
    console.log(Array.isArray(data.heroes));
    if (!data || !data.heroes) return null;
    return data.heroes.find((h) => h.slug === slug) || null;
  },
);
