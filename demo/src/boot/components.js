import Abbreviations from '../examples/Abbreviations'
import Blockquotes from '../examples/Blockquotes'
import Code from '../examples/Code'
import Containers from '../examples/Containers'
import DefinitionLists from '../examples/DefinitionLists'
import Emojies from '../examples/Emojies'
import Emphasis from '../examples/Emphasis'
import Footnotes from '../examples/Footnotes'
import Heading from '../examples/Heading'
import HorizontalRules from '../examples/HorizontalRules'
import Images from '../examples/Images'
import Insert from '../examples/Insert'
import Links from '../examples/Links'
import Lists from '../examples/Lists'
import Mark from '../examples/Mark'
import Rules from '../examples/Rules'
import SubscriptSuperscript from '../examples/SubscriptSuperscript'
import Tables from '../examples/Tables'
import TaskLists from '../examples/TaskLists'
import Titles from '../examples/Titles'
import Typography from '../examples/Typography'

export default ({ Vue }) => {
  Vue.component('Abbreviations', Abbreviations)
  Vue.component('Blockquotes', Blockquotes)
  Vue.component('Code', Code)
  Vue.component('Containers', Containers)
  Vue.component('DefinitionLists', DefinitionLists)
  Vue.component('Emojies', Emojies)
  Vue.component('Emphasis', Emphasis)
  Vue.component('Footnotes', Footnotes)
  Vue.component('Heading', Heading)
  Vue.component('HorizontalRules', HorizontalRules)
  Vue.component('Images', Images)
  Vue.component('Insert', Insert)
  Vue.component('Links', Links)
  Vue.component('Lists', Lists)
  Vue.component('Mark', Mark)
  Vue.component('Rules', Rules)
  Vue.component('SubscriptSuperscript', SubscriptSuperscript)
  Vue.component('Tables', Tables)
  Vue.component('TaskLists', TaskLists)
  Vue.component('Titles', Titles)
  Vue.component('Typography', Typography)
}
