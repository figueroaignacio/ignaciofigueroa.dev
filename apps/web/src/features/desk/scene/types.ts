export type DeskObjectKey =
  | 'laptop'
  | 'ask'
  | 'mate'
  | 'thermos'
  | 'badge'
  | 'notebook'
  | 'phone'
  | 'sheet'
  | 'books'
  | 'photos'
  | 'board';

export type DeskView = 'top' | 'desk' | 'screen';

export type DeskVariant = 'wide' | 'tall';

export type DeskTheme = 'light' | 'dark';

export interface SceneFonts {
  sans: string;
  mono: string;
}

export interface SceneStrings {
  openTag: string;
  name: string;
  role: string;
  city: string;
  message: string;
}

export interface SceneAssets {
  photo: string;
  react: string;
  claude: string;
  linux: string;
  higo: string;
  nachui: string;
  lockup: string;
  people: string[];
}

export interface SceneState {
  lid: boolean;
  view: DeskView;
  covered: boolean;
  focus: DeskObjectKey | null;
  absent: DeskObjectKey[];
  hover: DeskObjectKey | null;
  theme: DeskTheme;
  still: boolean;
}

export interface ScreenRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ScreenPoint {
  x: number;
  y: number;
  visible: boolean;
}
