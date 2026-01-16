import EditableWrapper from './EditableWrapper'
import CTA from './sections/CTA'
import FeatureList from './sections/FeatureList'
import Features from './sections/Features'
import Hero from './sections/Hero'
import HeroPremium from './sections/HeroPremium'
import ImageGallery from './sections/ImageGallery'
import ImageGrid from './sections/ImageGrid'
import ProductGridPremium from './sections/ProductGridPremium'
import SpecsTable from './sections/SpecsTable'
import SplitImageText from './sections/SplitImageText'
import Text from './sections/Text'

const sectionMap: any = {
  hero: Hero,
  heroPremium: HeroPremium,
  text: Text,
  cta: CTA,
  features: Features,
  featureList: FeatureList,
  splitImageText: SplitImageText,
  imageGallery: ImageGallery,
  imageGrid: ImageGrid,
  specsTable: SpecsTable,
  productGridPremium: ProductGridPremium,
}

export default function PageRenderer({ sections, mode }: any) {
  return (
    <>
      {sections
        .sort((a: any, b: any) => a.position - b.position)
        .map((section: any) => {
          const Comp = sectionMap[section.type]
          if (!Comp) return null

          // Pass content as 'data' prop for most components, or 'body' for Text
          const props = section.type === 'text' 
            ? { body: section.content?.body || section.content }
            : { data: section.content }

          return (
            <EditableWrapper
              key={section.id}
              section={section}
              enabled={mode === 'admin'}
            >
              <Comp {...props} />
            </EditableWrapper>
          )
        })}
    </>
  )
}
