import type { Resume } from '../../types/resume'
import {
  useResumeStore,
  type ResumeTemplate,
} from '../../store/resumeStore'

import AtsClassicTemplate from './templates/AtsClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import CompactTemplate from './templates/CompactTemplate'

interface ResumeTemplateRendererProps {
  template?: ResumeTemplate
  resume?: Resume
}

function ResumeTemplateRenderer({
  template,
  resume,
}: ResumeTemplateRendererProps) {
  const storeResume = useResumeStore(
    (state) => state.resume,
  )

  const storeTemplate = useResumeStore(
    (state) => state.selectedTemplate,
  )

  const activeResume = resume ?? storeResume
  const activeTemplate = template ?? storeTemplate

  if (activeTemplate === 'modern') {
    return (
      <ModernTemplate resume={activeResume} />
    )
  }

  if (activeTemplate === 'compact') {
    return (
      <CompactTemplate resume={activeResume} />
    )
  }

  return (
    <AtsClassicTemplate resume={activeResume} />
  )
}

export default ResumeTemplateRenderer