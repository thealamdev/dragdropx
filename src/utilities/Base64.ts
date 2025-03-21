export const Base64 = async (files: FileList | null): Promise<string[]> => {
    if (!files) { return Promise.resolve([]) }
    const ArrayList = Array.from(files);
    return Promise.all(
        ArrayList.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result as string)
                reader.onerror = reject
            })
        })
    )
}