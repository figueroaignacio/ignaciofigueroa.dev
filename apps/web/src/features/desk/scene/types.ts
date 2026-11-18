export type DeskObjectKey =
  'laptop' | 'ask' | 'mate' | 'thermos' | 'badge' | 'notebook' | 'phone' | 'sheet';

export type DeskView = 'top' | 'desk' | 'screen' | 'focus';

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
}

export interface SceneState {
  lid: boolean;
  view: DeskView;
  focus: DeskObjectKey | null;
  hover: DeskObjectKey | null;
  theme: DeskTheme;
  still: boolean;
}

export interface ScreenPoint {
  x: number;
  y: number;
  visible: boolean;
}
