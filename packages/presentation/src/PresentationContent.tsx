import {
  type Dispatch,
  type FunctionComponent,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import type {Path, SanityDocument} from 'sanity'

import {ContentEditor} from './editor/ContentEditor'
import {type CommentIntentGetter, CommentsIntentProvider} from './internals'
import {DisplayedDocumentBroadcasterProvider} from './loader/DisplayedDocumentBroadcaster'
import {Panel} from './panels/Panel'
import {PanelResizer} from './panels/PanelResizer'
import type {
  MainDocumentState,
  PersistentSearchParams,
  PresentationParams,
  StructureDocumentPaneParams,
} from './types'

export interface PresentationContentProps {
  documentId: PresentationParams['id']
  documentsOnPage: {_id: string; _type: string}[]
  documentType: PresentationParams['type']
  getCommentIntent: CommentIntentGetter
  mainDocumentState: MainDocumentState | undefined
  onFocusPath: (path: Path) => void
  onStructureParams: (params: StructureDocumentPaneParams) => void
  searchParams: PersistentSearchParams
  setDisplayedDocument: Dispatch<SetStateAction<Partial<SanityDocument> | null | undefined>>
  structureParams: StructureDocumentPaneParams
}

const PresentationContentWrapper: FunctionComponent<
  PropsWithChildren<{
    documentId?: string
    getCommentIntent: CommentIntentGetter
    setDisplayedDocument: Dispatch<SetStateAction<Partial<SanityDocument> | null | undefined>>
  }>
> = (props) => {
  const {documentId, setDisplayedDocument, getCommentIntent} = props
  return (
    <>
      <PanelResizer order={4} />
      <Panel id="content" minWidth={325} order={5}>
        <DisplayedDocumentBroadcasterProvider
          documentId={documentId}
          setDisplayedDocument={setDisplayedDocument}
        >
          <CommentsIntentProvider getIntent={getCommentIntent}>
            {props.children}
          </CommentsIntentProvider>
        </DisplayedDocumentBroadcasterProvider>
      </Panel>
    </>
  )
}

export const PresentationContent: FunctionComponent<PresentationContentProps> = (props) => {
  const {
    documentId,
    documentsOnPage,
    documentType,
    getCommentIntent,
    mainDocumentState,
    onFocusPath,
    onStructureParams,
    searchParams,
    setDisplayedDocument,
    structureParams,
  } = props

  return (
    <PresentationContentWrapper
      documentId={documentId}
      getCommentIntent={getCommentIntent}
      setDisplayedDocument={setDisplayedDocument}
    >
      <ContentEditor
        documentId={documentId}
        documentType={documentType}
        mainDocumentState={mainDocumentState}
        onFocusPath={onFocusPath}
        onStructureParams={onStructureParams}
        refs={documentsOnPage}
        searchParams={searchParams}
        structureParams={structureParams}
      />
    </PresentationContentWrapper>
  )
}
