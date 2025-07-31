'use client';

import { useState, useEffect } from 'react';
import { ReflectionCard } from '@/components/ReflectionCard';
import {FilterPanel} from '@/components/FilterPanel';
import { ReflectionData } from '@/types/reflection';
import "./globals.css";

const reflectionData: ReflectionData[] = [
  {
    title: "We Weren't Meant to Live Like This: Modern Life and the Rise of Emotional Exhaustion",
    slug: "emotional-exhaustion",
    imageUrl: "https://images.prismic.io/innerwell/aEdPubh8WN-LV6Rm_pexels-arthousestudio-4558326.jpg?auto=format,compress&w=1200&q=75",
    alt: "Modern Life and Emotional Exhaustion",
    author: "Innerwell Team",
    publishDate: "2025-07-30",
    wordCount: "N/A"
  },
  {
    title: "Why Joy Can Feel Scary: Learning to Hold the Good Without the Crash",
    slug: "fear-of-happiness",
    imageUrl: "https://images.unsplash.com/photo-1545315003-c5ad6226c272?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxNXx8aGFwcHl8ZW58MHx8fHwxNzUyMzEzOTEwfDA&ixlib=rb-4.1.0&q=85&w=1200&q=75",
    alt: "woman in green jacket raising her hands",
    author: "Innerwell Team",
    publishDate: "2025-07-30",
    wordCount: "N/A"
  },
  {
    title: "Is Emotional Fluency the New Intelligence?",
    slug: "emotional-awareness",
    imageUrl: "https://images.unsplash.com/photo-1570840934347-4dc56c98b8ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxMnx8am95ZnVsfGVufDB8fHx8MTc1MzkyMzY3OXww&ixlib=rb-4.1.0&q=85&w=1200&q=75",
    alt: "smiling woman",
    author: "Innerwell Team",
    publishDate: "2025-07-30",
    wordCount: "N/A"
  },
  {
    title: "Bridging the Divide: Managing Anxiety in an Era of Political Polarization",
    slug: "political-anxiety",
    imageUrl: "https://images.unsplash.com/photo-1577998555981-6e798325914e?dpr=1&fit=max&auto=compress%2Cformat",
    alt: "woman punching the air during golden hour",
    author: "Innerwell Team",
    publishDate: "2025-07-30",
    wordCount: "N/A"
  },
  {
    title: "The Loneliness You Can't See: High-Functioning Anxiety in a Social World",
    slug: "high-functioniong-anxiety",
    imageUrl: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?dpr=1&fit=max&auto=compress%2Cformat",
    alt: "woman sitting on black chair in front of glass-panel window with white curtains",
    author: "Innerwell Team",
    publishDate: "2025-07-30",
    wordCount: "N/A"
  },
  {
    title: "Emotional Regulation Is a Skill—Not a Personality Trait",
    slug: "emotional-regulation-skills",
    imageUrl: "https://images.unsplash.com/photo-1541258165115-f6c9b1db3669?dpr=1&fit=max&auto=compress%2Cformat",
    alt: "a blurry photo of a woman with her hands on her face",
    author: "Innerwell Team",
    publishDate: "2025-07-30",
    wordCount: "N/A"
  },
  {
    title: "Can You Get Seasonal Depression in the Summer? Understanding the Summer Blues",
    slug: "can-you-get-seasonal-depression-in-the-summer",
    imageUrl: "https://helloinnerwell.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Finnerwell%2F659c208e531ac2845a2737f3_pexels-marcelo-chagas-2437901.jpg%3Fauto%3Dformat%2Ccompress&w=1920&q=75",
    alt: "Summer Depression and Seasonal Affective Disorder",
    author: "Innerwell Team",
    publishDate: "2025-07-23",
    wordCount: "N/A"
  },
  // page 2
  {
    title: "Couples Therapy vs Individual Therapy: Which Is Best for You?",
    slug: "couples-therapy-vs-individual-therapy",
    imageUrl: "https://images.unsplash.com/photo-1604881990409-b9f246db39da?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0aGVyYXB5fGVufDB8fHx8MTc1Mzk4MTgxN3ww&ixlib=rb-4.1.0&q=85&w=1200&q=75",
    alt: "person in black long sleeve shirt holding white ceramic mug",
    author: "Innerwell Team",
    publishDate: "2025-07-23",
    wordCount: "N/A"
  },
  {
    title: "Can Stress and Anxiety Cause Body Aches? Here's What You Need to Know",
    slug: "can-stress-and-anxiety-cause-body-aches",
    imageUrl: "https://images.unsplash.com/photo-1596107034181-9f168717f1ee?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHw3fHxhY25lfGVufDB8fHx8MTc1Mzk4MjE0M3ww&ixlib=rb-4.1.0&q=85&w=1200&q=75",
    alt: "woman in gold hoop earrings",
    author: "Innerwell Team",
    publishDate: "2025-07-16",
    wordCount: "N/A"
  },
  {
    title: "The Hidden Impact of Chronic Pain on Emotional Well-Being",
    slug: "hidden-impact-of-chronic-pain",
    imageUrl: "https://images.unsplash.com/photo-1606677549026-762050b1e7ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxMnx8cGFpbnxlbnwwfHx8fDE3NTM5ODIzNTV8MA&ixlib=rb-4.1.0&q=85&w=1200&q=75",
    alt: "woman in white dress shirt",
    author: "Innerwell Team",
    publishDate: "2025-07-16",
    wordCount: "N/A"
  },
  {
    title: "Mental Health Stigma Is Still Holding People Back—Let's Talk About It",
    slug: "mental-health-stigma",
    imageUrl: "https://images.unsplash.com/photo-1620504155085-d7b152a58e77?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxNnx8YWxvbmV8ZW58MHx8fHwxNzUyMjYyNTA2fDA&ixlib=rb-4.1.0&q=85&w=1200&q=75",
    alt: "woman in black and white dress sitting on concrete stairs",
    author: "Innerwell Team",
    publishDate: "2025-07-11",
    wordCount: "N/A"
  },
  {
    title: "The Quiet Epidemic: Emotional Numbness",
    slug: "emotional-numbness",
    imageUrl: "https://images.prismic.io/innerwell/51d344de-05eb-43ba-8218-76c25a28ebec_pexels-juan-pablo-serrano-arenas-1101726.jpg?auto=format,compress&w=1200&q=75",
    alt: "Woman alone looking through the glass of the window",
    author: "Innerwell Team",
    publishDate: "2025-07-11",
    wordCount: "N/A"
  },
  {
    title: "Ketamine Therapy for Anxiety: A Promising Treatment",
    slug: "ketamine-therapy-for-anxiety",
    imageUrl: "https://images.prismic.io/innerwell/60fb58e3-49bf-401d-a5aa-1f94dbf23ac9_de-Innerwell_r1_03A_2962.jpg?auto=format,compress&w=1200&q=75",
    alt: "Woman in Innerwell keratine therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  {
    title: "Finding Support: Online Therapy for Trauma",
    slug: "finding-support-online-therapy-for-trauma",
    imageUrl: "https://images.prismic.io/innerwell/030aeb6c-317b-4732-b809-cd9088499723_therapy_resized.jpg?auto=format,compress&w=1200&q=75",
    alt: "Online therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  // page 3
  {
    title: "Veterans Psychedelic Therapy: Healing Our Heroes",
    slug: "veterans-psychedelic-therapy-healing-our-heroes",
    imageUrl: "https://images.prismic.io/innerwell/aEhHfrh8WN-LV8Lr_pexels-rdne-7467846.jpg?auto=format,compress&w=1200&q=75",
    alt: "Veterans smiling in a therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  {
    title: "Finding Relief: Online Therapy for Anxiety",
    slug: "finding-relief-online-therapy-for-anxiety",
    imageUrl: "https://images.prismic.io/innerwell/aEdRxLh8WN-LV6SZ_pexels-olly-3756168.jpg?auto=format,compress&w=1200&q=75",
    alt: "Joyous and stress-free woman with arms open wide, gazing up in an olive field",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  {
    title: "Finding Relief: Online Therapy for Obsessive Compulsive Disorder",
    slug: "finding-relief-online-therapy-for-obsessive-compulsive-disorder",
    imageUrl: "https://images.prismic.io/innerwell/aBucOCdWJ-7kRuI7_pexels-ketut-subiyanto-4474047.jpg?auto=format,compress&w=1200&q=75",
    alt: "Joyous woman taking note while viewing her laptop",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  {
    title: "EMDR Therapy for PTSD in Veterans: Healing the Invisible Wounds",
    slug: "emdr-therapy-for-ptsd-in-veterans-healing-the-invisible-wounds",
    imageUrl: "https://images.prismic.io/innerwell/aEhHf7h8WN-LV8Lt_pexels-rdne-7467908.jpg?auto=format,compress&w=1200&q=75",
    alt: "A smiling senior-aged soldier in therapy",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  {
    title: "Healing PTSD with Psychedelic Therapy for PTSD",
    slug: "healing-ptsd-with-psychedelic-therapy-for-ptsd",
    imageUrl: "https://images.prismic.io/innerwell/aBtBGSdWJ-7kRtCE_1736444017788_pexels-pavel-danilyuk-6549198_01JH621ZB2EDPXJZHR9RR788TH.jpg?auto=format,compress&w=1200&q=75",
    alt: "A calm man seated and looking outside through the window glass",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  {
    title: "Finding Freedom: Online Therapy for Agoraphobia",
    slug: "finding-freedom-online-therapy-for-agoraphobia",
    imageUrl: "https://images.prismic.io/innerwell/c8f8ba8c-c4f9-4156-864d-2fe2e4eec9e8_c5545a5a-13ee-4e8d-b916-5eb16fdd6e58_blog-post-women-laughing.jpg?auto=format,compress&w=1200&q=75",
    alt: "Women laughing and getting some sun",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  {
    title: "Healing Social Anxiety with Ketamine Therapy",
    slug: "healing-social-anxiety-with-ketamine-therapy",
    imageUrl: "https://images.prismic.io/innerwell/581f9e8a-c1f0-47bd-8158-e24e1691e682_45-Innerwell_r1_03A_2886-high-res.png?auto=format,compress&w=1200&q=75",
    alt: "Woman in Innerwell ketamine therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-16",
    wordCount: "N/A"
  },
  // page 4
  {
    title: "What Is Psychedelic Integration Therapy",
    slug: "what-is-psychedelic-integration-therapy",
    imageUrl: "https://images.prismic.io/innerwell/aEcbDLh8WN-LV5_B_1677595472985_db-Innerwell_r1_03A_2933-1-_01GTC7PXARNFJ238359DS9AZTC-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Psychedelic integration therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-10",
    wordCount: "N/A"
  },
  {
    title: "What is Ketamine Therapy",
    slug: "what-is-ketamine-therapy",
    imageUrl: "https://images.prismic.io/innerwell/a368da64-e9d4-416d-bbf5-6c7c66019c4e_Ketamine+101.webp?fit=max&auto=compress%2Cformat",
    alt: "Ketamine",
    author: "Innerwell Team",
    publishDate: "2025-06-10",
    wordCount: "N/A"
  },
  {
    title: "What Is Psychiatric Therapy? Professional Mental Healthcare Support",
    slug: "what-is-psychiatric-therapy",
    imageUrl: "https://images.prismic.io/innerwell/aEdOM7h8WN-LV6Qu_e1-Innerwell_r1_03A_2972-1-.png?auto=format,compress&w=1200&q=75",
    alt: "Professional psychiatric therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-09",
    wordCount: "N/A"
  },
  {
    title: "What Is EMDR Therapy?",
    slug: "what-is-emdr-therapy",
    imageUrl: "https://images.prismic.io/innerwell/aEdO8Lh8WN-LV6RE_pexels-annakester-5351741.jpg?auto=format,compress&w=1200&q=75",
    alt: "EMDR therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-08",
    wordCount: "N/A"
  },
  {
    title: "How to Stop an Anxiety Attack in the Heat of Summer",
    slug: "how-to-stop-anxiety-attack-in-the-heat-of-summer",
    imageUrl: "https://images.prismic.io/innerwell/Zw93TYF3NbkBXffC_pexels-mentalhealthamerica-5543374.jpg?auto=format,compress&w=1200&q=75",
    alt: "Summer anxiety management",
    author: "Innerwell Team",
    publishDate: "2025-06-07",
    wordCount: "N/A"
  },
  {
    title: "The Ultimate Guide to Talk Therapy: What It Is, How It Works & Who It Helps",
    slug: "what-is-talk-therapy",
    imageUrl: "https://images.prismic.io/innerwell/aEdQ0Lh8WN-LV6R5_pexels-mikhail-nilov-8297352.jpg?auto=format,compress&w=1200&q=75",
    alt: "Talk therapy session",
    author: "Innerwell Team",
    publishDate: "2025-06-06",
    wordCount: "N/A"
  },
  {
    title: "Summer Mental Health: How to Thrive During the Hottest Months",
    slug: "summer-mental-health",
    imageUrl: "https://images.prismic.io/innerwell/29f1b17a-acec-47ee-953e-d610f6dec881_2.+Tuning+In.webp?fit=max&auto=compress%2Cformat",
    alt: "Summer mental health and wellness",
    author: "Innerwell Team",
    publishDate: "2025-06-05",
    wordCount: "N/A"
  },

  // page 5
  {
    title: "What Does EMDR Therapy Do: 8 Key Mechanisms",
    slug: "what-does-edmr-therapy-do",
    imageUrl: "https://images.prismic.io/innerwell/aEdTcLh8WN-LV6TF_pexels-ivan-samkov-4458554.jpg?auto=format,compress&w=1200&q=75",
    alt: "EMDR therapy mechanisms and process",
    author: "Innerwell Team",
    publishDate: "2025-06-04",
    wordCount: "N/A"
  },
  {
    title: "8 Significant Benefits of EMDR Therapy",
    slug: "benefits-of-emdr-therapy",
    imageUrl: "https://images.prismic.io/innerwell/aEdUV7h8WN-LV6TZ_pexels-ivan-samkov-6799971.jpg?auto=format,compress&w=1200&q=75",
    alt: "EMDR therapy benefits and outcomes",
    author: "Innerwell Team",
    publishDate: "2025-06-03",
    wordCount: "N/A"
  },
  {
    title: "How Does EMDR Work?",
    slug: "how-does-emdr-work",
    imageUrl: "https://images.prismic.io/innerwell/Zs3kZ0aF0TcGJbj1_pexels-joaojesusdesign-879178.jpg?auto=format,compress&w=1200&q=75",
    alt: "EMDR therapy process and methodology",
    author: "Innerwell Team",
    publishDate: "2025-06-02",
    wordCount: "N/A"
  },
  {
    title: "Student Mental Health: Helping Young Adults Navigate the End-of-School Summer Transition",
    slug: "end-of-school-emotions",
    imageUrl: "https://images.prismic.io/innerwell/aEdUxbh8WN-LV6Tx_pexels-thiago-1265247-2410573.jpg?auto=format,compress&w=1200&q=75",
    alt: "Student mental health during summer transition",
    author: "Innerwell Team",
    publishDate: "2025-06-02",
    wordCount: "N/A"
  },
  {
    title: "EMDR Therapy for Depression and Anxiety: Understanding a New Path to Healing",
    slug: "emdr-therapy-for-anxiety-and-depression",
    imageUrl: "https://images.prismic.io/innerwell/aBs5PidWJ-7kRs9__1699969734083_innerwell-free-consultation2_01HF71F5FWECTBXSC8BZNG0VPX.jpg?auto=format,compress&w=1200&q=75",
    alt: "EMDR therapy for depression and anxiety treatment",
    author: "Innerwell Team",
    publishDate: "2025-05-15",
    wordCount: "N/A"
  },
  {
    title: "Healing Grief with EMDR: An Innovative Therapy for Lasting Peace",
    slug: "emdr-therapy-for-grief",
    imageUrl: "https://images.prismic.io/innerwell/aBs5QidWJ-7kRs-A_1718873479645_pexels-kelvin809-810775_01J0TDFQ6BAYCGME3BM63ACM3X.jpg?auto=format,compress&w=1200&q=75",
    alt: "EMDR therapy for grief and loss",
    author: "Innerwell Team",
    publishDate: "2025-05-08",
    wordCount: "N/A"
  },
  {
    title: "Ketamine Therapy for Veterans: A New Hope in Mental Health Treatment",
    slug: "ketamine-therapy-for-veterans",
    imageUrl: "https://images.prismic.io/innerwell/aBjs9_IqRLdaB4Lz_pexels-rdne-7468260.jpg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy for veterans mental health",
    author: "Innerwell Team",
    publishDate: "2025-05-07",
    wordCount: "N/A"
  },
  // page 6
  {
    title: "Understanding Trauma: A Journey Through the Brain and Beyond",
    slug: "psychedelic-therapy-for-trauma",
    imageUrl: "https://images.prismic.io/innerwell/aBulPydWJ-7kRuPt_pexels-shvetsa-4226119-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Understanding trauma and brain science",
    author: "Innerwell Team",
    publishDate: "2025-05-06",
    wordCount: "N/A"
  },
  {
    title: "Ketamine Therapy for Childhood Trauma: Understanding the Path to Healing",
    slug: "ketamine-therapy-for-childhood-trauma",
    imageUrl: "https://images.prismic.io/innerwell/aBs5MSdWJ-7kRs98_1695675190811_kelly-sikkema-beg4vkagLzs-unsplash_01HB71W3KKEYGMQ34FRK46V06G.jpeg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy for childhood trauma healing",
    author: "Innerwell Team",
    publishDate: "2025-05-02",
    wordCount: "N/A"
  },
  {
    title: "Can Psychedelic Therapy Help with Bipolar Disorder",
    slug: "psychedelic-therapy-for-bipolar",
    imageUrl: "https://images.prismic.io/innerwell/aBufDidWJ-7kRuKP_pexels-cottonbro-6763605.jpg?auto=format,compress&w=1200&q=75",
    alt: "Psychedelic therapy for bipolar disorder",
    author: "Innerwell Team",
    publishDate: "2025-04-30",
    wordCount: "N/A"
  },
  {
    title: "The Science Behind Ketamine Therapy: What the Latest Research Reveals About Treating Depression",
    slug: "science-behind-ketamine-therapy",
    imageUrl: "https://images.prismic.io/innerwell/aBujZidWJ-7kRuN5_pexels-edward-jenner-4033148-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Scientific research on ketamine therapy for depression",
    author: "Innerwell Team",
    publishDate: "2025-04-29",
    wordCount: "N/A"
  },
  {
    title: "What PTSD Really Feels Like—And How Healing Begins",
    slug: "ketamine-therapy-for-ptsd",
    imageUrl: "https://images.prismic.io/innerwell/aBjpXfIqRLdaB4Kf_pexels-mastercowley-897817.jpg?auto=format,compress&w=1200&q=75",
    alt: "Understanding PTSD and the healing process",
    author: "Innerwell Team",
    publishDate: "2025-04-18",
    wordCount: "N/A"
  },
  {
    title: "Exploring Talk Therapy for Depression",
    slug: "talk-therapy-for-depression",
    imageUrl: "https://images.prismic.io/innerwell/aBucuidWJ-7kRuJD_pexels-karolina-grabowska-4491461.jpg?auto=format,compress&w=1200&q=75",
    alt: "Talk therapy for depression treatment",
    author: "Innerwell Team",
    publishDate: "2025-04-16",
    wordCount: "N/A"
  },
  {
    title: "Understanding OCD: How Ketamine Therapy Can Offer Support & Healing",
    slug: "ketamine-therapy-for-ocd",
    imageUrl: "https://images.prismic.io/innerwell/aBjvAPIqRLdaB4NN_1743590067441_pexels-cottonbro-4553265_01JQV1247NZQABHZ1PAQ6KB121-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy for OCD treatment and support",
    author: "Innerwell Team",
    publishDate: "2025-03-27",
    wordCount: "N/A"
  },
  // page 7
  {
    title: "Understanding Ketamine Therapy for Pain Management",
    slug: "ketamine-therapy-for-pain-management",
    imageUrl: "https://images.prismic.io/innerwell/aBjqH_IqRLdaB4K0_pexels-kindelmedia-7298882-2-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy for pain management",
    author: "Innerwell Team",
    publishDate: "2025-03-20",
    wordCount: "N/A"
  },
  {
    title: "Understanding Treatment-Resistant Depression: When the Usual Approaches Don't Stick",
    slug: "understanding-treatment-resistant-depression",
    imageUrl: "https://images.prismic.io/innerwell/aBueZidWJ-7kRuJ1_pexels-olly-3772618-1--1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Treatment-resistant depression understanding",
    author: "Innerwell Team",
    publishDate: "2025-03-13",
    wordCount: "N/A"
  },
  {
    title: "Exploring Ketamine Therapy for Chronic Pain: Benefits, Safety, and the Healing Journey",
    slug: "ketamine-therapy-for-chronic-pain",
    imageUrl: "https://images.prismic.io/innerwell/aBs_5CdWJ-7kRtBp_pexels-ron-lach-8487215-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy for chronic pain treatment",
    author: "Innerwell Team",
    publishDate: "2025-03-07",
    wordCount: "N/A"
  },
  {
    title: "Ketamine Therapy for Depression and Anxiety",
    slug: "ketamine-therapy-for-anxiety-and-depression",
    imageUrl: "https://images.prismic.io/innerwell/76dd40ae-a229-4314-9ec3-1c3d051f0944_at-home-ketamine-vs-clinic-infusions.jpeg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy for depression and anxiety",
    author: "Innerwell Team",
    publishDate: "2025-03-05",
    wordCount: "N/A"
  },
  {
    title: "Understanding Ketamine Therapy for Couples",
    slug: "ketamine-therapy-for-couples",
    imageUrl: "https://images.prismic.io/innerwell/aBjV7fIqRLdaB4AW_pexels-maksgelatin-5552602-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy for couples treatment",
    author: "Innerwell Team",
    publishDate: "2025-02-28",
    wordCount: "N/A"
  },
  {
    title: "Understanding Autism and ADHD: Exploring Psychedelic Therapy for Autism and ADHD",
    slug: "understanding-autism-adhd",
    imageUrl: "https://images.prismic.io/innerwell/aBtZaSdWJ-7kRtSk_pexels-tara-winstead-8378728.jpg?auto=format,compress&w=1200&q=75",
    alt: "Psychedelic therapy for autism and ADHD",
    author: "Innerwell Team",
    publishDate: "2025-02-07",
    wordCount: "N/A"
  },
  {
    title: "EMDR Therapy for Family Trauma: Understanding and Healing Generational Wounds",
    slug: "emdr-therapy-for-family-trauma",
    imageUrl: "https://images.prismic.io/innerwell/aBto0SdWJ-7kRteg_pexels-vidalbalielojrfotografia-2880897-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "EMDR therapy for family trauma and generational healing",
    author: "Innerwell Team",
    publishDate: "2025-01-25",
    wordCount: "N/A"
  },

  // page 8
  {
    title: "Talk Therapy for NPD: Exploring Treatment Paths with Compassion and Clarity",
    slug: "talk-therapy-for-narcissistic-personality-disorder",
    imageUrl: "https://images.prismic.io/innerwell/aBs5WidWJ-7kRs-F_1726229251553_pexels-shvets-production-7176325-1-_01J7NMG22BBE2BEZNWVY46CPP9-1-.jpg?auto=format,compress&w=1200&q=75",
    alt: "Talk therapy for narcissistic personality disorder",
    author: "Innerwell Team",
    publishDate: "2025-01-23",
    wordCount: "N/A"
  },
  {
    title: "Mental Health Statistics in 2025: What the Numbers Really Say",
    slug: "mental-health-statistics",
    imageUrl: "https://images.prismic.io/innerwell/aBtsDSdWJ-7kRtlC_pexels-fauxels-3183153.jpg?auto=format,compress&w=1200&q=75",
    alt: "Mental health statistics and data analysis",
    author: "Innerwell Team",
    publishDate: "2025-01-16",
    wordCount: "N/A"
  },
  {
    title: "Understanding Abandonment Issues",
    slug: "emdr-therapy-for-abandonment-issues",
    imageUrl: "https://images.prismic.io/innerwell/aBtBHCdWJ-7kRtCG_1739272984382_pexels-liza-summer-6382487_01JKTBZ62J9TBXM8B7SRZPV08T.jpg?auto=format,compress&w=1200&q=75",
    alt: "Understanding and healing abandonment issues",
    author: "Innerwell Team",
    publishDate: "2025-01-15",
    wordCount: "N/A"
  },
  {
    title: "A Companion for Your Ketamine-Assisted Therapy: The Role of a Sitter",
    slug: "how-to-find-a-sitter",
    imageUrl: "https://images.prismic.io/innerwell/Zw93M4F3NbkBXfe2_pexels-cottonbro-5486098.jpg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy sitter and support companion",
    author: "Anthony Mangia",
    publishDate: "2024-10-17",
    wordCount: "N/A"
  },
  {
    title: "Clinician Spotlight: Dr. Ben Medrano",
    slug: "ben-medrano-blog-post",
    imageUrl: "https://images.prismic.io/innerwell/Zp9KIx5LeNNTxaYK_BenSquarePeachBackground.jpg?auto=format,compress&w=1200&q=75",
    alt: "Dr. Ben Medrano clinician spotlight",
    author: "Innerwell Team",
    publishDate: "2024-10-01",
    wordCount: "N/A"
  },
  {
    title: "Ketamine Integration - The Complete Guide",
    slug: "ketamine-integration-guide",
    imageUrl: "https://images.prismic.io/innerwell/83f2d996-c6b5-4e18-9ace-918bb325c4ed_psychedelic_integration_therapy.jpg?auto=format,compress&w=1200&q=75",
    alt: "Woman meeting psychotherapist for ketamine integration session",
    author: "Anthony Mangia",
    publishDate: "2024-08-27",
    wordCount: "N/A"
  },
  {
    title: "Ketamine Integration Exercises: How to Practice Them and Their Benefits",
    slug: "ketamine-integration-exercises",
    imageUrl: "https://images.prismic.io/innerwell/Zs3gAEaF0TcGJbfz_1719479292419_pexels-kindelmedia-7938556_01J1CF7MZSVQVE5A1NNHGK7D9H.jpg?auto=format%2Ccompress&rect=0%2C0%2C4000%2C3843&w=4000&h=3843&w=1200&q=75",
    alt: "Exercises like meditation can help you integrate the insights and breakthroughs you've had in ketamine therapy",
    author: "Anthony Mangia",
    publishDate: "2024-08-26",
    wordCount: "N/A"
  },

  // page 9
  {
    title: "Will Ketamine Show Up On My Drug Test",
    slug: "will-ketamine-show-up-on-my-drug-test",
    imageUrl: "https://images.prismic.io/innerwell/Zp-uLR5LeNNTxbO-_pexels-mediocrememories-954585.jpg?auto=format%2Ccompress&rect=0%2C0%2C3456%2C3456&w=3456&h=3456&w=1200&q=75",
    alt: "Drug testing and ketamine therapy",
    author: "Anthony Mangia",
    publishDate: "2024-07-21",
    wordCount: "N/A"
  },
  {
    title: "What to know if you're nervous about your first Ketamine experience",
    slug: "what-to-know-nervous-ketamine-experience",
    imageUrl: "https://images.prismic.io/innerwell/659c21df531ac2845a273802_pexels-alex-green-5699741.jpg?auto=format,compress&w=1200&q=75",
    alt: "First ketamine therapy experience guidance",
    author: "Ben Medrano, MD",
    publishDate: "2024-01-03",
    wordCount: "N/A"
  },
  {
    title: "How we keep you safe at Innerwell",
    slug: "how-we-keep-you-safe-at-innerwell",
    imageUrl: "https://images.prismic.io/innerwell/aIuuGqTt2nPbZnkH_pexels-louis-bauer-79024-249348.jpg?auto=format,compress&w=1200&q=75",
    alt: "Safety at innerwell therapy",
    author: "Ben Medrano, MD",
    publishDate: "2024-01-02",
    wordCount: "N/A"
  },
  {
    title: "In Memoriam: Dr. Garrett Deckel",
    slug: "in-memoriam-dr.-garrett-deckel",
    imageUrl: "https://images.prismic.io/innerwell/d0a32a6c-b5e6-413f-bdf8-5e14b035bcac_garrett_deckel_memoriam.jpg?auto=compress,format&w=1200&q=75",
    alt: "Dr. Garrett Deckel memorial tribute",
    author: "Innerwell Team",
    publishDate: "2023-10-18",
    wordCount: "N/A"
  },
  {
    title: "Innerwell Reviews from Real Patients",
    slug: "innerwell-reviews",
    imageUrl: "https://images.prismic.io/innerwell/e930b27d-93ca-4258-80de-c7b82515102c_customer-quote.jpg?auto=compress,format&w=1200&q=75",
    alt: "Patient reviews and testimonials",
    author: "Anthony Mangia",
    publishDate: "2023-06-22",
    wordCount: "N/A"
  },
  {
    title: "135 Intention Setting Examples for Ketamine Therapy",
    slug: "135-intention-setting-examples-for-ketamine-therapy",
    imageUrl: "https://images.prismic.io/innerwell/d66efb2e-007e-475b-9e82-4ca62876e14c_pexels-jayr-alvarez-4115782+%281%29.jpeg?fit=max&auto=compress%2Cformat",
    alt: "Intention setting examples for ketamine therapy",
    author: "Anthony Mangia",
    publishDate: "2023-06-14",
    wordCount: "N/A"
  },
  {
    title: "WEBINAR: Online Ketamine Therapy 101 with Dr. Mike Cooper",
    slug: "online-ketamine-therapy-101",
    imageUrl: "https://images.prismic.io/innerwell/464e0f38-78cb-4c13-b7a7-9e334bbea589_webinar_thumbnail1+%284%29.png?fit=max&auto=compress%2Cformat",
    alt: "Online ketamine therapy webinar with Dr. Mike Cooper",
    author: "Anthony Mangia",
    publishDate: "2023-06-02",
    wordCount: "N/A"
  },
  // page 10
  {
    title: "A Guide to Intention Setting For Ketamine Treatment",
    slug: "ketamine-intention-setting",
    imageUrl: "https://images.prismic.io/innerwell/8f9bf787-fc0d-49f4-b95d-891dff64cdea_intention-setting-ketamine.jpeg?auto=compress,format&w=1200&q=75",
    alt: "Intention setting is critical for ketamine treatment.",
    author: "Anthony Mangia",
    publishDate: "2023-04-12",
    wordCount: "N/A"
  },
  {
    title: "The Benefits of At-Home Ketamine Therapy vs In-Person Clinics",
    slug: "benefits-of-at-home-ketamine-therapy-vs-in-person",
    imageUrl: "https://images.prismic.io/innerwell/aIuyxKTt2nPbZnqN_pexels-polina-kovaleva-6541177.jpg?auto=format,compress&w=1200&q=75",
    alt: "At-home vs in-person ketamine therapy comparison",
    author: "Anthony Mangia",
    publishDate: "2023-04-10",
    wordCount: "N/A"
  },
  {
    title: "Low Cost Ketamine Treatment - What You Should Know",
    slug: "low-cost-ketamine-treatment",
    imageUrl: "https://images.prismic.io/innerwell/76f91edd-1ce2-41f6-92e4-4a4f47bcc27f_low-cost-ketamine-treatment.jpeg?auto=compress,format&w=1200&q=75",
    alt: "Low cost ketamine treatment - why you shouldn't always choose the cheapest ketamine provider",
    author: "Anthony Mangia",
    publishDate: "2023-03-23",
    wordCount: "N/A"
  },
  {
    title: "How to Prepare for Your Ketamine Experience",
    slug: "how-to-prepare-for-ketamine-experience",
    imageUrl: "https://images.prismic.io/innerwell/ac9731e7-3683-4623-a0f5-1fb9de8e744c_how-to-prepare-ketamine-experience.jpeg?auto=compress,format&w=1200&q=75",
    alt: "Preparing for ketamine therapy experience",
    author: "Nate Macanian",
    publishDate: "2023-01-16",
    wordCount: "N/A"
  },
  {
    title: "How do I interact with my therapist during my ketamine experience?",
    slug: "how-do-i-interact-with-my-therapist",
    imageUrl: "https://images.prismic.io/innerwell/aIuxpaTt2nPbZnnP_pexels-mart-production-7699500.jpg?auto=format,compress&w=1200&q=75",
    alt: "Therapist interaction during ketamine therapy",
    author: "Nate Macanian",
    publishDate: "2023-01-10",
    wordCount: "N/A"
  },
  {
    title: "Dispelling the stigma around psychedelics",
    slug: "dispelling-stigma-psychedelics",
    imageUrl: "https://images.prismic.io/innerwell/51d344de-05eb-43ba-8218-76c25a28ebec_pexels-juan-pablo-serrano-arenas-1101726.jpg?auto=compress,format&w=1200&q=75",
    alt: "Addressing psychedelic stigma and misconceptions",
    author: "Nate Macanian",
    publishDate: "2023-01-05",
    wordCount: "N/A"
  },
  {
    title: "Ketamine for Anxiety",
    slug: "ketamine-for-anxiety",
    imageUrl: "https://images.prismic.io/innerwell/2c40db08-47a7-45e2-801d-83a7644f1d18_pexels-m-venter-1659437.jpg?auto=compress,format&w=1200&q=75",
    alt: "Ketamine therapy for anxiety treatment",
    author: "Anthony Mangia",
    publishDate: "2023-01-02",
    wordCount: "N/A"
  },
  // page 11
  {
    title: "Post-Session Care: What to Do Once Your Psychedelic Experience Has Ended",
    slug: "post-session-care",
    imageUrl: "https://images.prismic.io/innerwell/49a84d2d-6f56-4f25-95b7-da0ceced472e_pexels-cottonbro-studio-4047042+%281%29.jpg?fit=max&auto=compress%2Cformat",
    alt: "Post-session care after psychedelic therapy",
    author: "Jenn Sinrich",
    publishDate: "2022-12-30",
    wordCount: "N/A"
  },
  {
    title: "How to Help Others Journey Safely: A Sitter's Guide",
    slug: "role-of-a-sitter",
    imageUrl: "https://images.prismic.io/innerwell/0ee2fd53-2705-4775-9aeb-8133acaeb0f2_priscilla-du-preez-qNH2e3Us0j8-unsplash.jpg?auto=compress,format&w=1200&q=75",
    alt: "Sitter guide for psychedelic therapy safety",
    author: "Innerwell Team",
    publishDate: "2022-12-28",
    wordCount: "N/A"
  },
  {
    title: "Ketamine 101",
    slug: "ketamine-101",
    imageUrl: "https://images.prismic.io/innerwell/aIu0iqTt2nPbZnud_pexels-pixabay-265076.jpg?auto=format,compress&w=1200&q=75",
    alt: "Ketamine therapy basics and fundamentals",
    author: "Jenn Sinrich",
    publishDate: "2022-12-25",
    wordCount: "N/A"
  },
  {
    title: "Raising The Standard of Care",
    slug: "what-to-consider-psychedelic-therapy",
    imageUrl: "https://images.prismic.io/innerwell/aIu1v6Tt2nPbZnxB_pexels-aurelijus-u-2148621102-30711884.jpg?auto=format,compress&w=1200&q=75",
    alt: "improvement",
    author: "Innerwell Team",
    publishDate: "2022-05-25",
    wordCount: "N/A"
  },
  {
    title: "Meet Innerwell",
    slug: "meet-innerwell",
    imageUrl: "https://images.prismic.io/innerwell/dd1c106a-942b-470e-be51-cc9d8564b113_1ada81f8-a169-4ddd-8b12-9deaab3a84da_Innerwell_Opt.jpg?auto=compress,format&w=1200&q=75",
    alt: "Innerwell team introduction and company overview",
    author: "Innerwell Team",
    publishDate: "2022-05-19",
    wordCount: "N/A"
  }
];

export default function Home() {
  const [filteredData, setFilteredData] = useState<ReflectionData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sort data by publish date (newest first), then alphabetically
  const sortedData = reflectionData.sort((a, b) => {
    const dateComparison = new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    if (dateComparison === 0) {
      return a.title.localeCompare(b.title);
    }
    return dateComparison;
  });

  useEffect(() => {
    const filtered = sortedData.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = (!startDate || item.publishDate >= startDate) &&
                         (!endDate || item.publishDate <= endDate);
      
      return matchesSearch && matchesDate;
    });
    
    setFilteredData(filtered);
  }, [searchTerm, startDate, endDate, sortedData]);

  const clearFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Innerwell Reflections
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of mental health insights, therapeutic approaches, and personal growth stories.
          </p>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          clearFilters={clearFilters}
          totalCount={sortedData.length}
          filteredCount={filteredData.length}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                No reflections found matching your criteria.
              </div>
            </div>
          ) : (
            filteredData.map((reflection) => (
              <ReflectionCard key={reflection.slug} reflection={reflection} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
