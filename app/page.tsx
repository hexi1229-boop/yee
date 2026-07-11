"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type StoryPage = {
  chapter: string;
  title: string;
  body: string[];
  image: string;
  alt: string;
  theme: "dawn" | "garden" | "ivory" | "night" | "water";
  focal?: string;
};

const storyPages: StoryPage[] = [
  {
    chapter: "无忧城外 · 序",
    title: "城里没有梦",
    body: [
      "在一座靠收走梦来维持快乐的城市里，被保护长大的少年王子第一次看见了眼泪。",
      "他原以为痛苦是一种错误，直到一次善意的选择，让一个女孩连同她最珍贵的记忆一起消失。",
      "天亮以前，他必须走出完美的城墙，追回一场正在熄灭的梦。",
    ],
    image: "/storybook/cover.jpg",
    alt: "希达、十五与灰羽站在无忧城外，梦灯沿水道流向远塔",
    theme: "dawn",
    focal: "52% center",
  },
  {
    chapter: "第一章 · 01",
    title: "被收走的梦",
    body: [
      "梦里，小梨又听见了铃声。母亲站在花丛尽头，摇着旧铃铛，叫她的名字。",
      "她正要跑过去，梦的边缘忽然裂开一道白光。一只白袖伸进来，轻轻拈走了她手里的光。",
      "小梨醒了。白衣人合上一盏小灯，温和地告诉她：醒来以后，她就不会难过了。",
      "窗外，一只灰鸟扑向将灭的梦光，却只来得及丢下一片羽毛。",
      "“喂，”它说，“那是我的。”",
    ],
    image: "/storybook/spread-01.jpg",
    alt: "小梨的温暖梦境被白衣人收进梦灯，灰羽从窗外扑来",
    theme: "night",
    focal: "56% center",
  },
  {
    chapter: "第一章 · 02",
    title: "完美的早晨",
    body: [
      "无忧城的早晨，从不允许人做噩梦。也不允许人记得噩梦。",
      "晨钟响过，街上没有争吵，没有哭声。花永远盛开，人们为无忧节挂起一模一样的笑脸。",
      "父王把玉佩戴在希达颈前：“愿你一生不见眼泪。”",
      "希达认真地点头：“等我长大，也会让所有人这样快乐。”",
      "人群边缘，一个穿旧衣的瘦少年顺走两块甜饼，又在逃跑前回头扶起摔倒的小孩。",
    ],
    image: "/storybook/spread-02.jpg",
    alt: "无忧节广场上父王为希达戴上玉佩，十五在远处扶起孩子",
    theme: "ivory",
    focal: "56% center",
  },
  {
    chapter: "第一章 · 03",
    title: "城里的第一滴眼泪",
    body: [
      "午后，希达在王宫后园听见一种陌生的声音。",
      "园丁女孩小梨抱着旧铃铛，眼睛通红。她身旁有一盆枯花——整座城里，仿佛只有这盆花和她一样，忘了保持完美。",
      "希达蹲下来，认真看着她脸上的水痕。",
      "“你的眼睛坏了吗？”",
      "小梨愣了一下，反而哭得更厉害了。这是希达第一次看见眼泪。",
    ],
    image: "/storybook/spread-03.jpg",
    alt: "希达在后园第一次看见哭泣的小梨和枯萎的花",
    theme: "garden",
    focal: "58% center",
  },
  {
    chapter: "第一章 · 04",
    title: "白铃",
    body: [
      "小梨摊开手掌。旧铃铛磨得发亮。她告诉希达，娘活着的时候总用铃铛叫她回家。",
      "希达想起无忧誓词：“如果你这么难过，我可以让他们帮你。”",
      "“不要叫他们。”小梨向后退去，手指被花刺划破，“我不想不记得她。”",
      "希达相信自己必须救她。于是，他拉响了园中的白铃。",
      "叮——空气忽然冷了下来。",
    ],
    image: "/storybook/spread-04.jpg",
    alt: "希达拉响白铃，小梨抱着旧铜铃惊恐后退",
    theme: "garden",
    focal: "57% center",
  },
  {
    chapter: "第一章 · 05",
    title: "你做得对",
    body: [
      "白衣人无声地走进后园。他们的动作很轻，仿佛真的是来接一个迷路的孩子。",
      "“别怕，我们只是帮你把难过的梦收起来。”",
      "小梨扑过去抓住希达：“殿下，我不想忘记她！”",
      "她的手被一点点掰开。旧铃铛落在石板上。",
      "“殿下，您做得对。”希达捡起铃铛。它很小，却重得让他第一次不敢相信一句夸奖。",
    ],
    image: "/storybook/spread-05.jpg",
    alt: "白衣人带走小梨，铜铃落在希达面前",
    theme: "ivory",
    focal: "53% center",
  },
  {
    chapter: "第一章 · 06",
    title: "从来没有小梨",
    body: [
      "当天夜里，小梨住过的小屋空空荡荡。",
      "“后园从来没有叫小梨的人。”园丁微笑着说。",
      "希达攥着铃铛跑向议事殿，却在门外听见无忧司的声音：“小梨已经安置。梦灯会在天亮前归静。”",
      "门内，父王按住案上一枚旧发簪，指节发白。",
      "父王不是被骗了。父王知道。",
    ],
    image: "/storybook/spread-06.jpg",
    alt: "希达在月夜门外偷听，父王在门内握着旧发簪",
    theme: "night",
    focal: "52% center",
  },
  {
    chapter: "第一章 · 07",
    title: "会说话的灰鸟",
    body: [
      "“拿着证据去问一个被收过梦的人，真有你的。”",
      "灰鸟落在墙头。希达抬头：“鸟会说话？”",
      "“王子会犯蠢，我都没这么惊讶。”",
      "希达握紧铃铛：“那你至少告诉我，我把她害到哪里去了。”",
      "灰鸟看见他手里的铃铛，沉默片刻：“我叫灰羽。跟上，别踩自己的袍子。”",
    ],
    image: "/storybook/spread-07.jpg",
    alt: "月下高廊上灰羽与希达第一次交谈",
    theme: "night",
    focal: "54% center",
  },
  {
    chapter: "第一章 · 08",
    title: "天亮以前",
    body: [
      "无忧司侧塔安静得像一座没有呼吸的图书馆。",
      "一盏盏梦灯被推向城墙深处。灯中有人奔跑、拥抱、告别，也有人反复呼喊一个正在消失的名字。",
      "小梨的梦灯里，她仍向母亲跑去，可母亲的脸已经开始变淡。",
      "灰羽低声告诉希达，天亮前灯要是灭了，小梨就再也叫不出梦里那个人的名字。",
      "无忧城不是没有痛苦，只是把痛苦连同爱过的证据一起运走了。",
    ],
    image: "/storybook/spread-08.jpg",
    alt: "无忧司侧塔中排列着无数梦灯，小梨的梦正在变淡",
    theme: "night",
    focal: "58% center",
  },
  {
    chapter: "第一章 · 09",
    title: "半片羽毛",
    body: [
      "小梨的梦灯沿窄轨滑向黑暗水门。",
      "希达冲向门，灰羽也扑向缠在灯上的羽毛。他们撞在一起，门上的白铃骤然震响。",
      "灰羽只啄回半片羽毛。另一半仍缠在梦灯上，带着小梨最后的记忆滑入黑暗。",
      "守卫的灯光追来。希达抱紧铃铛，和灰羽钻进一条潮湿、冰冷的城下水道。",
    ],
    image: "/storybook/spread-09.jpg",
    alt: "警铃响起，希达和灰羽追赶正在远去的小梨梦灯",
    theme: "water",
    focal: "54% center",
  },
  {
    chapter: "第一章 · 10",
    title: "水道里的十五",
    body: [
      "脚步声越来越近。一只手忽然从暗处伸出，把希达拖进断墙后。白灯从他们面前扫过，没有停留。",
      "救了他们的，正是白天偷甜饼的瘦少年。",
      "“出城？我熟。带路，一枚玉佩。”",
      "“我不是要出城，”希达说，“我要找小梨。”",
      "少年脸上的笑淡了一点：“在这座城里，被大人说不存在的人，通常是真的活过。”",
      "“你叫什么？”——“十五。”",
    ],
    image: "/storybook/spread-10.jpg",
    alt: "十五把希达和灰羽藏到水道断墙后躲避搜灯",
    theme: "water",
    focal: "57% center",
  },
  {
    chapter: "第一章 · 11",
    title: "只有穷人才知道的路",
    body: [
      "“梦灯会走水门。”灰羽说。",
      "十五听了听远处的车轮声：“那就不是出城，是追车。水门下面的路，只有穷人才知道。”",
      "他一边带路，一边顺走希达的玉佩。",
      "追兵的白灯很快照亮水道。十五原本可以独自逃走，却看见希达仍死死攥着那只旧铃铛。",
      "他停了半步，转身踢开腐朽木板：“走这边。你这种小孩，离开宫门三步就会被骗光。”",
    ],
    image: "/storybook/spread-11.jpg",
    alt: "十五拉着希达在水道中逃跑，灰羽带着半片发光羽毛飞行",
    theme: "water",
    focal: "54% center",
  },
  {
    chapter: "第一章 · 12",
    title: "城外第一夜",
    body: [
      "城外有风，有枯草和烧饭的烟。这里一点也不完美，却每一样都是真的。",
      "希达回望城墙。那些灯火不是星星，而是一盏盏被收走的梦。",
      "半片羽毛亮起。小梨的梦说：“我怕我会忘记你。”",
      "希达握紧铃铛：“我会把你的梦找回来。”",
      "十五抛了抛刚偷来的玉佩。灰羽飞上夜空。他们沿着梦灯远去的方向，走进无忧城外的第一夜。",
    ],
    image: "/storybook/spread-12.jpg",
    alt: "希达、十五与灰羽在城外第一夜望向梦灯和远塔",
    theme: "night",
    focal: "52% center",
  },
];

const lastPageIndex = storyPages.length - 1;

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<"next" | "previous">("next");
  const [isReading, setIsReading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notice, setNotice] = useState("");
  const touchStart = useRef<number | null>(null);
  const currentPage = storyPages[pageIndex];

  const goToPage = useCallback((target: number) => {
    const nextIndex = Math.max(0, Math.min(lastPageIndex, target));
    setPageIndex((current) => {
      if (current === nextIndex) return current;
      setTurnDirection(nextIndex > current ? "next" : "previous");
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsReading(false);
  }, [pageIndex]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goToPage(pageIndex + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToPage(pageIndex - 1);
      }
      if (event.key === "Home") goToPage(0);
      if (event.key === "End") goToPage(lastPageIndex);
      if (event.key.toLowerCase() === "f") toggleFullscreen();
    };

    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", handleKey);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("fullscreenchange", syncFullscreen);
    };
  }, [goToPage, pageIndex]);

  const pageLabel = useMemo(
    () => (pageIndex === 0 ? "封面" : `${String(pageIndex).padStart(2, "0")} / ${lastPageIndex}`),
    [pageIndex],
  );

  function toggleReadAloud() {
    if (!("speechSynthesis" in window)) {
      flashNotice("当前浏览器暂不支持朗读");
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `${currentPage.title}。${currentPage.body.join("。")}`,
    );
    utterance.lang = "zh-CN";
    utterance.rate = 0.9;
    utterance.pitch = 0.96;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      flashNotice("当前环境无法进入全屏");
    }
  }

  async function shareStory() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "无忧城外 · 城里没有梦",
          text: "一部关于梦、失去与看见的原创视觉故事。",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        flashNotice("阅读链接已复制");
      }
    } catch {
      // The user can dismiss the native share sheet without needing an error.
    }
  }

  function flashNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 1800);
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 48) return;
    goToPage(pageIndex + (distance < 0 ? 1 : -1));
  }

  return (
    <main
      className={`reader-shell theme-${currentPage.theme}`}
      onTouchStart={(event) => {
        touchStart.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="ambient-art"
        style={{ backgroundImage: `url(${currentPage.image})` }}
        aria-hidden="true"
      />
      <div className="ambient-wash" aria-hidden="true" />

      <header className="reader-toolbar" aria-label="故事阅读工具栏">
        <div className="story-identity">
          <span className="identity-mark" aria-hidden="true">羽</span>
          <div>
            <p>无忧城外</p>
            <span>原创视觉故事 · 第一集</span>
          </div>
        </div>

        <nav className="page-nav" aria-label="翻页">
          <button
            type="button"
            className="icon-button"
            onClick={() => goToPage(pageIndex - 1)}
            disabled={pageIndex === 0}
            aria-label="上一页"
          >
            ←
          </button>
          <button
            type="button"
            className="page-counter"
            onClick={() => goToPage(pageIndex === 0 ? 1 : 0)}
            aria-label="切换封面与正文"
          >
            {pageLabel}
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={() => goToPage(pageIndex + 1)}
            disabled={pageIndex === lastPageIndex}
            aria-label="下一页"
          >
            →
          </button>
        </nav>

        <div className="reader-actions">
          <button type="button" className="icon-button utility" onClick={toggleFullscreen} aria-label={isFullscreen ? "退出全屏" : "进入全屏"}>
            {isFullscreen ? "⊡" : "⛶"}
          </button>
          <a className="icon-button utility" href="/storybook/wuyou-chengwai.pdf" aria-label="导出 PDF" title="导出 PDF">
            ⇩
          </a>
          <button type="button" className="icon-button utility" onClick={shareStory} aria-label="分享故事">
            ↗
          </button>
          <button type="button" className={`listen-button ${isReading ? "active" : ""}`} onClick={toggleReadAloud}>
            <span aria-hidden="true">{isReading ? "Ⅱ" : "▶"}</span>
            {isReading ? "暂停朗读" : "听故事"}
          </button>
        </div>
      </header>

      <section className="reader-stage" aria-live="polite">
        <article key={pageIndex} className={`story-book turn-${turnDirection}`}>
          <div className="art-page">
            <img
              src={currentPage.image}
              alt={currentPage.alt}
              style={{ objectPosition: currentPage.focal ?? "center" }}
            />
            <div className="art-vignette" aria-hidden="true" />
            <div className="art-caption">
              <span>{pageIndex === 0 ? "序章" : `第 ${String(pageIndex).padStart(2, "0")} 页`}</span>
              <i aria-hidden="true" />
              <span>无忧城外</span>
            </div>
          </div>

          <div className="paper-page">
            <div className="paper-grain" aria-hidden="true" />
            <div className="chapter-heading">
              <span>{currentPage.chapter}</span>
              <i aria-hidden="true" />
            </div>
            <h1>{currentPage.title}</h1>
            <div className="story-copy">
              {currentPage.body.map((paragraph, index) => (
                <p key={`${pageIndex}-${index}`} className={index === 0 ? "lead" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
            <footer className="paper-footer">
              <span>{pageIndex === 0 ? "开始阅读" : String(pageIndex).padStart(2, "0")}</span>
              <button
                type="button"
                onClick={() => goToPage(pageIndex + 1)}
                disabled={pageIndex === lastPageIndex}
              >
                {pageIndex === lastPageIndex ? "第一集完" : "翻到下一页"}
              </button>
            </footer>
          </div>

          <button
            type="button"
            className="edge-control previous"
            onClick={() => goToPage(pageIndex - 1)}
            disabled={pageIndex === 0}
            aria-label="上一页"
          />
          <button
            type="button"
            className="edge-control next"
            onClick={() => goToPage(pageIndex + 1)}
            disabled={pageIndex === lastPageIndex}
            aria-label="下一页"
          />
        </article>
      </section>

      <footer className="reader-footer">
        <div className="progress-rail" role="tablist" aria-label="故事进度">
          {storyPages.map((page, index) => (
            <button
              key={page.title}
              type="button"
              role="tab"
              aria-selected={pageIndex === index}
              aria-label={index === 0 ? "封面" : `第${index}页：${page.title}`}
              className={pageIndex === index ? "current" : pageIndex > index ? "passed" : ""}
              onClick={() => goToPage(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <p>方向键翻页 · F 全屏 · 移动端可左右滑动</p>
      </footer>

      {notice && <div className="notice" role="status">{notice}</div>}
    </main>
  );
}
