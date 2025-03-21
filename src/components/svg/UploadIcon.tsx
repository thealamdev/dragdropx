interface IconInterface {
    width?: string
    height?: string
    stroke?: string
}
export default function UploadIcon({ width = "26", height = "24", stroke = "#8D899F" }: IconInterface) {
    return (
        <svg width={width} height={height} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.17969 12V20C4.17969 20.5304 4.39981 21.0391 4.79162 21.4142C5.18344 21.7893 5.71486 22 6.26897 22H18.8047C19.3588 22 19.8902 21.7893 20.282 21.4142C20.6739 21.0391 20.894 20.5304 20.894 20V12" stroke="#8D899F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.7126 6L12.534 2L8.35547 6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5352 2V15" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}