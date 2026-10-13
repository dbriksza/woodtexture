import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    console.log(style)
    return new ImageResponse(
        (
        // ImageResponse JSX element
            style ?
                <div
                    style={{
                        background: style
                    }}
                >
                </div> :
                <div>

                </div>
        ),
        // ImageResponse options
        {
        // For convenience, we can re-use the exported icons size metadata
        // config to also set the ImageResponse's width and height.
        ...size,
        }
    )
}