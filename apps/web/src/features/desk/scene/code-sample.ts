export type CodeTone = 'plain' | 'keyword' | 'string' | 'type' | 'number' | 'tag' | 'call';

export type CodeLine = Array<[text: string, tone?: CodeTone]>;

export const CODE_TABS = ['dock.tsx', 'home-hero.tsx', 'tokens.css'];

export const CODE_FIRST_LINE = 30;

export const CODE_LINES: CodeLine[] = [
  [
    ['const', 'keyword'],
    [' SECTION_IDS = ['],
    ["'experience'", 'string'],
    [', '],
    ["'projects'", 'string'],
    [', '],
    ["'about'", 'string'],
    [', '],
    ["'contact'", 'string'],
    ['] '],
    ['as const', 'keyword'],
    [';'],
  ],
  [],
  [
    ['const', 'keyword'],
    [' SECTION_ICONS: '],
    ['Record', 'type'],
    ['<'],
    ['string', 'type'],
    [', '],
    ['ReactNode', 'type'],
    ['> = {'],
  ],
  [['  experience: <'], ['BriefcaseIcon', 'tag'], [' strokeWidth={'], ['1.5', 'number'], ['} />,']],
  [['  projects: <'], ['FolderIcon', 'tag'], [' strokeWidth={'], ['1.5', 'number'], ['} />,']],
  [['  about: <'], ['UserIcon', 'tag'], [' strokeWidth={'], ['1.5', 'number'], ['} />,']],
  [['  contact: <'], ['MailIcon', 'tag'], [' strokeWidth={'], ['1.5', 'number'], ['} />,']],
  [['};']],
  [],
  [['interface', 'keyword'], [' '], ['DockItem', 'type'], [' {']],
  [['  key: '], ['string', 'type'], [';']],
  [['  label: '], ['string', 'type'], [';']],
  [['  icon: '], ['ReactNode', 'type'], [';']],
  [['  href?: '], ['string', 'type'], [';']],
  [['  sectionId?: '], ['string', 'type'], [';']],
  [['}']],
  [],
  [['export function', 'keyword'], [' '], ['Dock', 'call'], ['() {']],
  [['  '], ['const', 'keyword'], [' pathname = '], ['usePathname', 'call'], ['();']],
  [
    ['  '],
    ['const', 'keyword'],
    [' t = '],
    ['useTranslations', 'call'],
    ['('],
    ["'ui'", 'string'],
    [');'],
  ],
  [
    ['  '],
    ['const', 'keyword'],
    [' tChat = '],
    ['useTranslations', 'call'],
    ['('],
    ["'components.chat.header'", 'string'],
    [');'],
  ],
];
