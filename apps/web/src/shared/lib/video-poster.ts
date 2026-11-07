export function videoPoster(url: string) {
  return url.replace('/upload/', '/upload/so_1,w_1200,f_jpg/').replace(/\.mp4$/, '.jpg');
}
