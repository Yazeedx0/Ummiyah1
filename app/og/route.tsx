/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const preferredRegion = ["iad1"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "عنوان افتراضي";
    const description = searchParams.get("description") || "وصف افتراضي";

    // Load font
    const fontData = await fetch(
      new URL("../../assets/geist-semibold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // Load image as base64 string
    const imageBuffer = await fetch(
      new URL("./background.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const base64Image = `data:image/png;base64,${Buffer.from(imageBuffer).toString("base64")}`;

    return new ImageResponse(
      (
        <div
          tw="flex h-full w-full relative"
          style={{ fontFamily: "geist" }}
        >
          {/* الخلفية */}
          <img src={base64Image} tw="absolute w-full h-full object-cover" alt="background" />

          {/* المحتوى */}
          <div tw="flex flex-col absolute h-full w-[750px] justify-center left-[50px] pr-[50px] pt-[116px] pb-[166px]">
            <div
              tw="text-zinc-50 tracking-tight leading-[1.1]"
              style={{
                fontWeight: 500,
                fontSize: 80,
                color: "black",
                letterSpacing: "-0.05em",
              }}
            >
              {title}
            </div>
            <div tw="text-[40px]" style={{ color: "#7D7D7D" }}>
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 628,
        fonts: [
          {
            name: "geist",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (error: any) {
    return new Response(`Failed to generate image: ${error.message}`, {
      status: 500,
    });
  }
}
