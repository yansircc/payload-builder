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
import { default as default_b128d0bd7c3a2b8021c74b08f7767dc4 } from '@/blocks/About/components/About1/config.client.tsx'
import { default as default_2a39a1af771424381d098717f69480b6 } from '@/blocks/CallToAction/components/CTA1/config.client.tsx'
import { default as default_35255ec42d8f32ecd043bb2b02f0d65b } from '@/blocks/CallToAction/components/CTA3/config.client.tsx'
import { default as default_4f5590e45a90eb434ada1df399f6564e } from '@/blocks/CallToAction/components/CTA4/config.client.tsx'
import { default as default_d37134f7322778e01ca7a3ca8ae25ac1 } from '@/blocks/CallToAction/components/CTA5/config.client.tsx'
import { default as default_2b197559a662bb08eadd63ff14a7f6fc } from '@/blocks/CallToAction/components/CTA7/config.client.tsx'
import { default as default_63fc0bdd9b297e91ecfb9ddf27413d37 } from '@/blocks/CallToAction/components/CTA10/config.client.tsx'
import { default as default_8e5f8c64f7244ddb08417184b5c5b763 } from '@/blocks/CallToAction/components/CTA11/config.client.tsx'
import { default as default_c9e88eb416816f056243184d9024760b } from '@/blocks/CallToAction/components/CTA15/config.client.tsx'
import { default as default_6f8bb1f48fffd0933e97720290f1a109 } from '@/blocks/CallToAction/components/CTA16/config.client.tsx'
import { default as default_d6db59c80cebea06c148fec189e53daa } from '@/blocks/CallToAction/components/CTA17/config.client.tsx'
import { default as default_bafd9d65d3f430d169af59e4590f6782 } from '@/blocks/FAQ/components/FAQ1/config.client'
import { default as default_872195d3dd318fc5c29718afc686f763 } from '@/blocks/FAQ/components/FAQ2/config.client'
import { default as default_9a36d79c50622bbd20021e17543322e8 } from '@/blocks/FAQ/components/FAQ3/config.client'
import { default as default_1a7510af427896d367a49dbf838d2de6 } from '@/components/BeforeDashboard'
import { default as default_8a7ab0eb7ab5c511aba12e68480bfe5e } from '@/components/BeforeLogin'
import { default as default_78b39f784b86cf844383560b5f1a85bf } from '@/components/ColorPicker/'
import { default as default_545a25a7f6f58e32e2350bd4892658ab } from '@/components/IconSelect/'
import { AIFeature as AIFeature_c86cb9794e8dfc789dceffc1ecbdea8d } from '@/fields/ai/client'
import { SlugComponent as SlugComponent_92cc057d0a2abb4f6cf0307edf59f986 } from '@/fields/slug/SlugComponent'

export const importMap = {
  '@payloadcms/plugin-multi-tenant/client#TenantField':
    TenantField_1d0591e3cf4f332c83a86da13a0de59a,
  '@/components/IconSelect/#default': default_545a25a7f6f58e32e2350bd4892658ab,
  '@/blocks/About/components/About1/config.client.tsx#default':
    default_b128d0bd7c3a2b8021c74b08f7767dc4,
  '@/blocks/CallToAction/components/CTA1/config.client.tsx#default':
    default_2a39a1af771424381d098717f69480b6,
  '@/blocks/CallToAction/components/CTA3/config.client.tsx#default':
    default_35255ec42d8f32ecd043bb2b02f0d65b,
  '@/blocks/CallToAction/components/CTA4/config.client.tsx#default':
    default_4f5590e45a90eb434ada1df399f6564e,
  '@/blocks/CallToAction/components/CTA5/config.client.tsx#default':
    default_d37134f7322778e01ca7a3ca8ae25ac1,
  '@/blocks/CallToAction/components/CTA7/config.client.tsx#default':
    default_2b197559a662bb08eadd63ff14a7f6fc,
  '@/blocks/CallToAction/components/CTA10/config.client.tsx#default':
    default_63fc0bdd9b297e91ecfb9ddf27413d37,
  '@/blocks/CallToAction/components/CTA11/config.client.tsx#default':
    default_8e5f8c64f7244ddb08417184b5c5b763,
  '@/blocks/CallToAction/components/CTA15/config.client.tsx#default':
    default_c9e88eb416816f056243184d9024760b,
  '@/blocks/CallToAction/components/CTA16/config.client.tsx#default':
    default_6f8bb1f48fffd0933e97720290f1a109,
  '@/blocks/CallToAction/components/CTA17/config.client.tsx#default':
    default_d6db59c80cebea06c148fec189e53daa,
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
  '@/blocks/FAQ/components/FAQ1/config.client#default': default_bafd9d65d3f430d169af59e4590f6782,
  '@/blocks/FAQ/components/FAQ2/config.client#default': default_872195d3dd318fc5c29718afc686f763,
  '@/blocks/FAQ/components/FAQ3/config.client#default': default_9a36d79c50622bbd20021e17543322e8,
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
