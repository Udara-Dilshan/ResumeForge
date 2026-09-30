import {
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer'

import ResumeTemplateRenderer from '../components/preview/ResumeTemplateRenderer'
import ResumePdfDocument from '../components/pdf/ResumePdfDocument'

import {
  useResumeStore,
} from '../store/resumeStore'

function createFileName(
  fullName: string,
) {
  const safeName =
    fullName
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  return `${
    safeName || 'ResumeForge'
  }-Resume.pdf`
}

function TemplatePreviewPage() {
  const resume = useResumeStore(
    (state) => state.resume,
  )

  const selectedTemplate =
    useResumeStore(
      (state) => state.selectedTemplate,
    )

  const goToStep = useResumeStore(
    (state) => state.goToStep,
  )

  const fileName = createFileName(
    resume.personalInfo.fullName,
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            PDF Preview
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            {selectedTemplate === 'ats-classic'
              ? 'ATS Classic'
              : selectedTemplate === 'modern'
                ? 'Modern'
                : 'Compact'}
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => goToStep(13)}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Change Template
          </button>

          <PDFDownloadLink
            document={
              <ResumePdfDocument
                resume={resume}
                template={selectedTemplate}
              />
            }
            fileName={fileName}
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {({ loading, error }) =>
              error
                ? 'PDF Error'
                : loading
                  ? 'Preparing PDF...'
                  : 'Download PDF'
            }
          </PDFDownloadLink>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-slate-100 p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-900">
              Resume Preview
            </h2>

            <p className="text-sm text-slate-500">
              Web preview
            </p>
          </div>

          <div className="overflow-auto">
            <div className="mx-auto w-full max-w-[794px] bg-white shadow-xl">
              <ResumeTemplateRenderer
                template={
                  selectedTemplate
                }
                resume={resume}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-900 p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-white">
              PDF Preview
            </h2>

            <p className="text-sm text-slate-400">
              Actual generated A4 PDF
            </p>
          </div>

          <PDFViewer
            width="100%"
            height={900}
            showToolbar
            className="rounded-lg"
          >
            <ResumePdfDocument
              resume={resume}
              template={selectedTemplate}
            />
          </PDFViewer>
        </section>
      </div>
    </main>
  )
}

export default TemplatePreviewPage