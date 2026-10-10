// One place that maps icon names used in data files to react-icons components (keeps bundles tree-shaken).
import {
  LuBriefcase, LuTerminal, LuCompass, LuDatabase, LuLayers, LuScrollText, LuBrain, LuCode,
  LuChartColumn, LuPalette, LuBox, LuWorkflow, LuPuzzle,
} from 'react-icons/lu'
import {
  SiOpenjdk, SiPython, SiHtml5, SiCss, SiJavascript, SiReact, SiSpringboot, SiSpringsecurity, SiFastapi,
  SiNodedotjs, SiExpress, SiTensorflow, SiPytorch, SiScikitlearn, SiHuggingface, SiDocker, SiJenkins,
  SiGithubactions, SiApachemaven, SiMysql, SiMongodb, SiPostgresql, SiGit, SiGithub, SiIntellijidea, SiFigma,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'

export const ICONS = {
  LuBriefcase, LuTerminal, LuCompass, LuDatabase, LuLayers, LuScrollText, LuBrain, LuCode, LuChartColumn,
  LuPalette, LuBox, LuWorkflow, LuPuzzle,
  SiOpenjdk, SiPython, SiHtml5, SiCss, SiJavascript, SiReact, SiSpringboot, SiSpringsecurity, SiFastapi,
  SiNodedotjs, SiExpress, SiTensorflow, SiPytorch, SiScikitlearn, SiHuggingface, SiDocker, SiJenkins,
  SiGithubactions, SiApachemaven, SiMysql, SiMongodb, SiPostgresql, SiGit, SiGithub, SiIntellijidea, SiFigma,
  FaAws,
}
export const Icon = ({ name, ...rest }) => {
  const C = ICONS[name] || LuCode
  return <C aria-hidden="true" {...rest} />
}
