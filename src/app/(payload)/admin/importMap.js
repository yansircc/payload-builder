import {
  TenantField as TenantField_1d0591e3cf4f332c83a86da13a0de59a,
  TenantSelector as TenantSelector_1d0591e3cf4f332c83a86da13a0de59a,
} from '@payloadcms/plugin-multi-tenant/client'
import {
  GlobalViewRedirect as GlobalViewRedirect_d6d5f193a167989e2ee7d14202901e62,
  TenantSelectionProvider as TenantSelectionProvider_d6d5f193a167989e2ee7d14202901e62,
} from '@payloadcms/plugin-multi-tenant/rsc'
import {
  LinkToDoc as LinkToDoc_aead06e4cbf6b2620c5c51c9ab283634,
  ReindexButton as ReindexButton_aead06e4cbf6b2620c5c51c9ab283634,
} from '@payloadcms/plugin-search/client'
import {
  MetaDescriptionComponent as MetaDescriptionComponent_a8a977ebc872c5d5ea7ee689724c0860,
  MetaImageComponent as MetaImageComponent_a8a977ebc872c5d5ea7ee689724c0860,
  MetaTitleComponent as MetaTitleComponent_a8a977ebc872c5d5ea7ee689724c0860,
  OverviewComponent as OverviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
  PreviewComponent as PreviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
} from '@payloadcms/plugin-seo/client'
import {
  BlocksFeatureClient as BlocksFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  BoldFeatureClient as BoldFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  FixedToolbarFeatureClient as FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  HeadingFeatureClient as HeadingFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  HorizontalRuleFeatureClient as HorizontalRuleFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  InlineToolbarFeatureClient as InlineToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  ItalicFeatureClient as ItalicFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  LinkFeatureClient as LinkFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  ParagraphFeatureClient as ParagraphFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  UnderlineFeatureClient as UnderlineFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
} from '@payloadcms/richtext-lexical/client'
import {
  RscEntryLexicalCell as RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e,
  RscEntryLexicalField as RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e,
} from '@payloadcms/richtext-lexical/rsc'
import { default as default_a48147a5d9e361c38690affd82c29136 } from 'src/collections/CustomCodes/components/ScriptRowLabel'
import { default as default_1a7510af427896d367a49dbf838d2de6 } from '@/components/BeforeDashboard'
import { default as default_8a7ab0eb7ab5c511aba12e68480bfe5e } from '@/components/BeforeLogin'
import { default as default_78b39f784b86cf844383560b5f1a85bf } from '@/components/ColorPicker/'

import { default as default_451f87e9402710cb271a0a0c66065661 } from '@/components/StaticPreview'
import { default as default_545a25a7f6f58e32e2350bd4892658ab } from '@/components/IconSelect/'

import { AIFeature as AIFeature_c86cb9794e8dfc789dceffc1ecbdea8d } from '@/fields/ai/client'
import { SlugComponent as SlugComponent_92cc057d0a2abb4f6cf0307edf59f986 } from '@/fields/slug/SlugComponent'

export const importMap = {
  '@payloadcms/plugin-multi-tenant/client#TenantField':
    TenantField_1d0591e3cf4f332c83a86da13a0de59a,
  '@/components/IconSelect/#default': default_545a25a7f6f58e32e2350bd4892658ab,
  '@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell':
    RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e,
  '@payloadcms/richtext-lexical/rsc#RscEntryLexicalField':
    RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e,
  '@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient':
    InlineToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient':
    FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/richtext-lexical/client#HeadingFeatureClient':
    HeadingFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@/fields/ai/client#AIFeature': AIFeature_c86cb9794e8dfc789dceffc1ecbdea8d,
  '@payloadcms/richtext-lexical/client#ParagraphFeatureClient':
    ParagraphFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/richtext-lexical/client#UnderlineFeatureClient':
    UnderlineFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/richtext-lexical/client#BoldFeatureClient':
    BoldFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/richtext-lexical/client#ItalicFeatureClient':
    ItalicFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/richtext-lexical/client#LinkFeatureClient':
    LinkFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/plugin-seo/client#OverviewComponent':
    OverviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
  '@payloadcms/plugin-seo/client#MetaTitleComponent':
    MetaTitleComponent_a8a977ebc872c5d5ea7ee689724c0860,
  '@payloadcms/plugin-seo/client#MetaImageComponent':
    MetaImageComponent_a8a977ebc872c5d5ea7ee689724c0860,
  '@payloadcms/plugin-seo/client#MetaDescriptionComponent':
    MetaDescriptionComponent_a8a977ebc872c5d5ea7ee689724c0860,
  '@payloadcms/plugin-seo/client#PreviewComponent':
    PreviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
  '@/fields/slug/SlugComponent#SlugComponent': SlugComponent_92cc057d0a2abb4f6cf0307edf59f986,
  '@/components/StaticPreview#default': default_451f87e9402710cb271a0a0c66065661,
  '@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient':
    HorizontalRuleFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '@payloadcms/richtext-lexical/client#BlocksFeatureClient':
    BlocksFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  '/collections/CustomCodes/components/ScriptRowLabel#default':
    default_a48147a5d9e361c38690affd82c29136,
  '@/components/ColorPicker/#default': default_78b39f784b86cf844383560b5f1a85bf,
  '@payloadcms/plugin-search/client#LinkToDoc': LinkToDoc_aead06e4cbf6b2620c5c51c9ab283634,
  '@payloadcms/plugin-search/client#ReindexButton': ReindexButton_aead06e4cbf6b2620c5c51c9ab283634,
  '@payloadcms/plugin-multi-tenant/rsc#GlobalViewRedirect':
    GlobalViewRedirect_d6d5f193a167989e2ee7d14202901e62,
  '@/components/BeforeDashboard#default': default_1a7510af427896d367a49dbf838d2de6,
  '@/components/BeforeLogin#default': default_8a7ab0eb7ab5c511aba12e68480bfe5e,
  '@payloadcms/plugin-multi-tenant/client#TenantSelector':
    TenantSelector_1d0591e3cf4f332c83a86da13a0de59a,
  '@payloadcms/plugin-multi-tenant/rsc#TenantSelectionProvider':
    TenantSelectionProvider_d6d5f193a167989e2ee7d14202901e62,
}
