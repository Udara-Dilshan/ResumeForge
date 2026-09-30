import type { ResumeTemplate } from '../../store/resumeStore'
import type { Resume } from '../../types/resume'

import AtsClassicTemplate from './templates/AtsClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import CompactTemplate from './templates/CompactTemplate'

interface Props {
  template: ResumeTemplate
  resume: Resume
}

function ResumeTemplateRenderer({
  template,
  resume,
}: Props) {
  if (template === 'modern') {
    return <ModernTemplate resume={resume} />
  }

  if (template === 'compact') {
    return <CompactTemplate resume={resume} />
  }

  return <AtsClassicTemplate resume={resume} />
}

export default ResumeTemplateRenderer