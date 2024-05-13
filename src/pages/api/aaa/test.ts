import fetch from 'node-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const records = mockData;
        // for (let i = 0; i < records.length; i++) {
        //     await new Promise((resolve) =>
        //         setTimeout(async () => {
        //             try {
        //                 const response = await fetch('https://migration.prismic.io/documents', {
        //                     headers: {
        //                         'Content-Type': 'application/json',
        //                         repository: 'bfpmigrate',
        //                         Authorization:
        //                             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6ImJmcG1pZ3JhdGUtN2YyZGVlNzAtZDViYi00NGQzLTgxMmQtMjg0MmI3YWU3ZGFlXzUiLCJkYXRlIjoxNzEzMTc2OTc2LCJkb21haW4iOiJiZnBtaWdyYXRlIiwiYXBwTmFtZSI6Im1pZ3JhdGUiLCJpYXQiOjE3MTMxNzY5NzZ9.huw3K6rNsSWDCOOYdstN3-mej1z2ZoDLau422NVVkck',
        //                         'x-api-key': 'cSaZlfkQlF9C6CEAM2Del6MNX9WonlV86HPbeEJL'
        //                     },
        //                     method: 'POST',
        //                     body: JSON.stringify({
        //                         type: 'page',
        //                         title: 'My New Post',
        //                         lang: 'en-us',
        //                         data: {
        //                             body: [
        //                                 {
        //                                     type: 'paragraph',
        //                                     text: records[i].content.rendered
        //                                 }
        //                             ],
        //                             created: records[i].date,
        //                             title: records[i].title.rendered,
        //                             slices: [
        //                                 {
        //                                     variation: 'default',
        //                                     primary: {
        //                                         text: [
        //                                             {
        //                                                 type: 'paragraph',
        //                                                 text: 'This is a new slice. I write a content here.'
        //                                             }
        //                                         ]
        //                                     },
        //                                     slice_type: 'hero'
        //                                 }
        //                             ]
        //                         },
        //                         uid: 'wp' + records[i].id
        //                     })
        //                 });

        //                 console.log(await response);
        //             } catch (e) {
        //                 console.log(e);
        //             }
        //             resolve();
        //         }, 2000)
        //     );
        // }
        try {
            console.log('records[0]', records[0]);
            const response = await fetch('https://migration.prismic.io/documents', {
                headers: {
                    'Content-Type': 'application/json',
                    repository: 'bfpmigrate',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6ImJmcG1pZ3JhdGUtN2YyZGVlNzAtZDViYi00NGQzLTgxMmQtMjg0MmI3YWU3ZGFlXzUiLCJkYXRlIjoxNzEzMTc2OTc2LCJkb21haW4iOiJiZnBtaWdyYXRlIiwiYXBwTmFtZSI6Im1pZ3JhdGUiLCJpYXQiOjE3MTMxNzY5NzZ9.huw3K6rNsSWDCOOYdstN3-mej1z2ZoDLau422NVVkck',
                    'x-api-key': 'cSaZlfkQlF9C6CEAM2Del6MNX9WonlV86HPbeEJL'
                },
                method: 'POST',
                body: JSON.stringify({
                    type: 'article',
                    title: records[0].title.rendered,
                    lang: 'en-us',
                    data: {
                        body: [
                            {
                                type: 'paragraph',
                                text: records[0].content.rendered
                            }
                        ],
                        //created: records[0].date,
                        title: records[0].title.rendered,
                        slices: [
                            {
                                variation: 'default',
                                primary: {
                                    text: [
                                        {
                                            type: 'paragraph',
                                            text: 'This is a new slice. I write a content here.'
                                        }
                                    ]
                                },
                                slice_type: 'hero'
                            }
                        ]
                    },
                    uid: 'wp' + records[0].id
                })
            });

            console.log(await response);
            console.log('done');
            res.status(200).json({ res: 'ok' });
        } catch (e) {
            console.log(e);
            res.status(405);
        }
    } else {
        res.status(405);
    }
}

//init();
const mockData = [
    {
        id: 221898,
        date: '2024-04-16T11:06:25',
        date_gmt: '2024-04-16T08:06:25',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221898'
        },
        modified: '2024-04-16T11:06:25',
        modified_gmt: '2024-04-16T08:06:25',
        slug: 'saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/',
        title: {
            rendered: 'Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization'
        },
        content: {
            rendered:
                '<div id="attachment_221902" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.org_.jpeg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221902" class="wp-image-221902 size-medium" title="Twitter/jns.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.org_.jpeg?resize=400%2C267&#038;ssl=1" alt="" width="400" height="267" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.org_.jpeg?resize=400%2C267&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.org_.jpeg?resize=1024%2C683&amp;ssl=1 1024w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.org_.jpeg?resize=600%2C400&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.org_.jpeg?w=1320&amp;ssl=1 1320w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221902" class="wp-caption-text">Saudi Crown Prince Mohammed bin Salman (second from left)</p></div>\n<p>Tuesday, 16 April 2024 | Saudi Arabia has accused Iran of instigating the conflict in Gaza to undermine progress in reaching a normalization agreement between Riyadh and Jerusalem.</p>\n<p>In an interview with Israeli public broadcaster <em>Kan News</em> on Sunday, a source from the royal family also said that Tehran promotes terrorism and suggested that Riyadh played a role in thwarting Saturday night’s drone and missile attack against Israel by the Islamic Republic and its proxies.</p>\n<p>Notably, a recap of the interview is published prominently on the <em>House of Saud</em> website, which covers the royal family.</p>\n<p>“Iran is a nation that endorses terrorism and the world should have curtailed it much earlier,” the Saudi royal said.</p>\n<p>In its first-ever direct attack on the Jewish state, Iran launched hundreds of drones and missiles on Saturday night, with the vast majority of them intercepted by Israel and allied militaries. The <em>Kan</em> interview appears to be the first Saudi acknowledgment that it helped fend off the attack, along with the US, UK, Jordan and France.</p>\n<p>The Iranian attack was in response to an alleged Israeli airstrike in Damascus earlier this month that killed a top Quds Force commander.</p>\n<p>In what the article describes as a “subtle” acknowledgment, the source told <em>Kan News</em> that the Saudi air defenses automatically intercept “any suspicious entity” that enters its airspace, which could be a reference to attacks from Iran’s terror proxy the Houthis in Yemen.</p>\n<p>“We confront every suspicious object that enters Saudi airspace. This is a matter of sovereignty,” the source said.</p>\n<p>The Saudis also shared intelligence with the US and Israel to help counter the Iranian attack, according to a report in the <em>Wall Street Journal</em> published on Monday. The Emiratis, who forged diplomatic ties with Jerusalem in 2020 as part of the Abraham Accords, also shared intelligence, US and Israeli officials told the <em>Journa</em>l.</p>\n<p>Arab governments were initially cautious about giving the information due to fears about directly involving themselves in the conflict and opening themselves up to Iranian reprisals. However, according to the report, Riyadh and Abu Dhabi decided to move forward after talks with the Americans.</p>\n<p>Amman also agreed to allow the Americans and other countries to fly warplanes through its airspace to intercept Iranian missiles and drones and that the Jordanians themselves would assist in shooting them down, the sources said.</p>\n<p>“Two days before the attack, Iranian officials briefed counterparts from Saudi Arabia and other Gulf countries on the outlines and timing of their plan for the large-scale strikes on Israel so that those countries could safeguard airspace, the officials said. The information was passed along to the US, giving Washington and Israel crucial advance warning,” according to the <em>Journal</em> article.</p>\n<p>“With an Iranian attack all but certain, the White House ordered the Pentagon to reposition aircraft and missile-defense resources to the region and took the lead in coordinating defensive measures between Israel and Arab governments, according to the senior Israeli official,” the article continued.</p>\n<p>“The challenge was to bring all those countries around Israel” at a time when Israel is isolated in the region, the official said. “It was a diplomatic issue.”</p>\n<p>On October 7, Hamas led a mass invasion of southern Israel, killing some 1,200 people, mostly civilians, wounding thousands more and kidnapping some 250 others, of whom more than a hundred remain in captivity.</p>\n<p>Riyadh put US-brokered Israeli normalization talks on ice after the October 7 massacre and amid the ensuing war, but has maintained that a deal is still on the table.</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Tuesday, 16 April 2024 | Saudi Arabia has accused Iran of instigating the conflict in Gaza to undermine progress in reaching a normalization agreement between Riyadh and Jerusalem. In an interview with Israeli public broadcaster Kan News on Sunday, a source from the royal family also said that Tehran promotes terrorism and suggested that Riyadh<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 9632,
        featured_media: 221899,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization - Bridges for Peace" />\n<meta property="og:description" content="Tuesday, 16 April 2024 | Saudi Arabia has accused Iran of instigating the conflict in Gaza to undermine progress in reaching a normalization agreement between Riyadh and Jerusalem. In an interview with Israeli public broadcaster Kan News on Sunday, a source from the royal family also said that Tehran promotes terrorism and suggested that Riyadh" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-16T08:06:25+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="mbrown" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="mbrown" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="4 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/"},"author":{"name":"mbrown","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81"},"headline":"Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization","datePublished":"2024-04-16T08:06:25+00:00","dateModified":"2024-04-16T08:06:25+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/"},"wordCount":603,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/","url":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/","name":"Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-16T08:06:25+00:00","dateModified":"2024-04-16T08:06:25+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81","name":"mbrown","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","caption":"mbrown"},"url":"https://www.bridgesforpeace.com/author/mbrown/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization - Bridges for Peace',
            og_description:
                'Tuesday, 16 April 2024 | Saudi Arabia has accused Iran of instigating the conflict in Gaza to undermine progress in reaching a normalization agreement between Riyadh and Jerusalem. In an interview with Israeli public broadcaster Kan News on Sunday, a source from the royal family also said that Tehran promotes terrorism and suggested that Riyadh',
            og_url: 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-16T08:06:25+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'mbrown',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'mbrown',
                'Est. reading time': '4 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/'
                        },
                        author: {
                            name: 'mbrown',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81'
                        },
                        headline: 'Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization',
                        datePublished: '2024-04-16T08:06:25+00:00',
                        dateModified: '2024-04-16T08:06:25+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/'
                        },
                        wordCount: 603,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: ['https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#respond']
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/',
                        url: 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/',
                        name: 'Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-16T08:06:25+00:00',
                        dateModified: '2024-04-16T08:06:25+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/saudis-iran-instigated-gaza-war-to-sabotage-israel-normalization/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Saudis: Iran Instigated Gaza War to Sabotage Israel Normalization'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81',
                        name: 'mbrown',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            caption: 'mbrown'
                        },
                        url: 'https://www.bridgesforpeace.com/author/mbrown/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_1_saudi_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VJ0',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221898'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/9632'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221898'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221898/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221905,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221898/revisions/221905'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221899'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221898'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221898'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221898'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221890,
        date: '2024-04-16T11:03:14',
        date_gmt: '2024-04-16T08:03:14',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221890'
        },
        modified: '2024-04-16T11:03:14',
        modified_gmt: '2024-04-16T08:03:14',
        slug: 'hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/',
        title: {
            rendered: 'Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’'
        },
        content: {
            rendered:
                '<div id="attachment_221894" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.org_.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221894" class="wp-image-221894 size-medium" title="Abed Rahim Khatib/Flash90/jns.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.org_.jpg?resize=400%2C267&#038;ssl=1" alt="" width="400" height="267" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.org_.jpg?resize=400%2C267&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.org_.jpg?resize=1024%2C683&amp;ssl=1 1024w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.org_.jpg?resize=600%2C400&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.org_.jpg?w=1320&amp;ssl=1 1320w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221894" class="wp-caption-text">Hamas claims they have “incomplete data” for 11,371 of the falsely reported 33,091 recorded Palestinian deaths.</p></div>\n<p>Tuesday, 16 April 2024 | The Hamas-run Ministry of Health in Gaza says it has “incomplete data” for one-third of the Palestinian fatalities it claims to have documented from its current war against Israel.</p>\n<p>The acknowledgment in a report on the social networking app Telegram last week raises anew questions about the veracity of its casualty count from the war.</p>\n<p>The April 6 report said that Hamas had “incomplete data” for 11,371 of the 33,091 recorded Palestinian deaths it claims and is missing one or more key data points including identity number, full name, date of birth, or date of death.</p>\n<p>In a report three days earlier, the ministry admitted the “incompleteness” of 12,263 records. It was not immediately clear why, after three more days, that figure dropped to 11,371.</p>\n<p>Before its admissions of incomplete data, the ministry asserted that the information in more than 15,000 fatality records had stemmed from “reliable media sources.” However, the ministry never identified the sources in question and Gaza has no independent media.</p>\n<p>David Adesnik, director of research at the Washington-based Foundation for Defense of Democracies (FDD), said, “The sudden shifts in the ministry’s reporting methods suggest it is scrambling to prevent exposure of its shoddy work.</p>\n<p>“For months, US media have taken for granted that the ministry’s top-line figure for casualties was reliable enough to include in daily updates on the war. Now we’re seeing that a third or more of the ministry’s data may be incomplete at best—and fictional at worst,” he added.</p>\n<p>Joe Truzman, a senior research analyst at FDD, said, “It is important to recognize that Hamas is deeply invested in shaping the narrative that emerges from Gaza, particularly regarding the number of casualties in the war.</p>\n<p>“Moreover, this control of data extends beyond the statistics provided by the Hamas-controlled Health Ministry, as there is also a deliberate effort to downplay the number of terrorists who have been killed by Israel in the war,” he added.</p>\n<p>The Israel Defense Forces has said that at least 13,000 of the Palestinians killed in the war against Hamas in Gaza and another 1,000 slain inside Israel during the October 7 invasion, were terrorists.</p>\n<p>Last month, a statistics expert asserted the Hamas claim that 70% of the casualties of the war were women and children was “statistically impossible” and “not reliable at all.”</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Tuesday, 16 April 2024 | The Hamas-run Ministry of Health in Gaza says it has “incomplete data” for one-third of the Palestinian fatalities it claims to have documented from its current war against Israel. The acknowledgment in a report on the social networking app Telegram last week raises anew questions about the veracity of its<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 9632,
        featured_media: 221891,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’ - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’ - Bridges for Peace" />\n<meta property="og:description" content="Tuesday, 16 April 2024 | The Hamas-run Ministry of Health in Gaza says it has “incomplete data” for one-third of the Palestinian fatalities it claims to have documented from its current war against Israel. The acknowledgment in a report on the social networking app Telegram last week raises anew questions about the veracity of its" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-16T08:03:14+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="mbrown" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="mbrown" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="3 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/"},"author":{"name":"mbrown","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81"},"headline":"Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’","datePublished":"2024-04-16T08:03:14+00:00","dateModified":"2024-04-16T08:03:14+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/"},"wordCount":413,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/","url":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/","name":"Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’ - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-16T08:03:14+00:00","dateModified":"2024-04-16T08:03:14+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81","name":"mbrown","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","caption":"mbrown"},"url":"https://www.bridgesforpeace.com/author/mbrown/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’ - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’ - Bridges for Peace',
            og_description:
                'Tuesday, 16 April 2024 | The Hamas-run Ministry of Health in Gaza says it has “incomplete data” for one-third of the Palestinian fatalities it claims to have documented from its current war against Israel. The acknowledgment in a report on the social networking app Telegram last week raises anew questions about the veracity of its',
            og_url: 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-16T08:03:14+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'mbrown',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'mbrown',
                'Est. reading time': '3 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/'
                        },
                        author: {
                            name: 'mbrown',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81'
                        },
                        headline: 'Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’',
                        datePublished: '2024-04-16T08:03:14+00:00',
                        dateModified: '2024-04-16T08:03:14+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/'
                        },
                        wordCount: 413,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: ['https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#respond']
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/',
                        url: 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/',
                        name: 'Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’ - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-16T08:03:14+00:00',
                        dateModified: '2024-04-16T08:03:14+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/hamas-admits-one-third-of-its-data-on-gazan-deaths-is-incomplete/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Hamas Admits One-third of its Data on Gazan Deaths is ‘Incomplete’'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81',
                        name: 'mbrown',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            caption: 'mbrown'
                        },
                        url: 'https://www.bridgesforpeace.com/author/mbrown/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_2_palestinians_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VIS',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221890'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/9632'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221890'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221890/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221897,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221890/revisions/221897'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221891'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221890'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221890'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221890'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221882,
        date: '2024-04-16T10:59:43',
        date_gmt: '2024-04-16T07:59:43',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221882'
        },
        modified: '2024-04-16T10:59:43',
        modified_gmt: '2024-04-16T07:59:43',
        slug: 'east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/',
        title: {
            rendered: 'East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks'
        },
        content: {
            rendered:
                '<div id="attachment_221886" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.org_.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221886" class="wp-image-221886 size-medium" title="Jacobgonzales20/Wikimedia.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.org_.jpg?resize=400%2C267&#038;ssl=1" alt="" width="400" height="267" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.org_.jpg?resize=400%2C267&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.org_.jpg?resize=600%2C400&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.org_.jpg?w=800&amp;ssl=1 800w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221886" class="wp-caption-text">Arabs shot off fireworks in East Jerusalem during Iran&#8217;s attack against Israel (illustrative).</p></div>\n<p>Tuesday, 16 April 2024 | Palestinian residents of the Silwan neighborhood in East Jerusalem celebrated the Iranian missile and drone attacks on Israel by firing fireworks as a sign of solidarity with Tehran.</p>\n<p>MK Dan Illouz of the ruling Likud Party questioned National Security Minister Itamar Ben-Gvir on Monday if any arrests were made in connection with the incident and if those arrested would be prosecuted under anti-terrorism laws.</p>\n<p>The incident rekindled allegations that Iran, similarly to Turkey, has been working in recent years to establish a foothold in Jerusalem through investments in front organizations, including the Silwan Women&#8217;s Association.</p>\n<p>The Jerusalem Center for Applied Policy found evidence of Iranian involvement in East Jerusalem neighborhoods and presented documentation of projects funded by Iraq that transferred significant budgets to Jerusalem-based organizations associated with the Palestinian Authority [PA].</p>\n<p>Furthermore, one of the individuals who contributed to the rapprochement between Iran and East Jerusalem was former PA ambassador to Iraq Ahmed Aqil, considered a protégé of Jibril Rajoub, who is associated with Iran and close to Hamas. The Jerusalem Center for Applied Policy noted a certain trend of this influence in Silwan, following the decision of PA Chairman Mahmoud Abbas to appoint Ahmed Rawidi, a resident of Silwan, as ambassador to Iraq.</p>\n<p>The incident demonstrates the wide support the Islamic Republic enjoys in Jerusalem&#8217;s streets. However, prominent residents of Silwan criticized these displays of solidarity, fearing that the entire village might be labeled as supporting Iran or terrorism.</p>\n<p>Jerusalem Center for Applied Policy research director Ran Yishai, who previously served as director general of the Jerusalem municipality and a liaison to the Foreign Ministry, said, &#8220;Iran is trying to influence Jerusalem through front organizations supported by the pro-Iranian coalition in Iraq and through individuals with ties to Jibril Rajoub.&#8221;</p>\n<p>According to him, &#8220;The separation between the Arabs of Jerusalem and those wishing to live in peace with Israel must also be achieved through nurturing relationships and coexistence, alongside decisive actions against any manifestation of terrorism and incitement against Israel.&#8221;</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Tuesday, 16 April 2024 | Palestinian residents of the Silwan neighborhood in East Jerusalem celebrated the Iranian missile and drone attacks on Israel by firing fireworks as a sign of solidarity with Tehran. MK Dan Illouz of the ruling Likud Party questioned National Security Minister Itamar Ben-Gvir on Monday if any arrests were made in<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 9632,
        featured_media: 221883,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks - Bridges for Peace" />\n<meta property="og:description" content="Tuesday, 16 April 2024 | Palestinian residents of the Silwan neighborhood in East Jerusalem celebrated the Iranian missile and drone attacks on Israel by firing fireworks as a sign of solidarity with Tehran. MK Dan Illouz of the ruling Likud Party questioned National Security Minister Itamar Ben-Gvir on Monday if any arrests were made in" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-16T07:59:43+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="mbrown" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="mbrown" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="2 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/"},"author":{"name":"mbrown","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81"},"headline":"East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks","datePublished":"2024-04-16T07:59:43+00:00","dateModified":"2024-04-16T07:59:43+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/"},"wordCount":364,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/","url":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/","name":"East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-16T07:59:43+00:00","dateModified":"2024-04-16T07:59:43+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81","name":"mbrown","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","caption":"mbrown"},"url":"https://www.bridgesforpeace.com/author/mbrown/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks - Bridges for Peace',
            og_description:
                'Tuesday, 16 April 2024 | Palestinian residents of the Silwan neighborhood in East Jerusalem celebrated the Iranian missile and drone attacks on Israel by firing fireworks as a sign of solidarity with Tehran. MK Dan Illouz of the ruling Likud Party questioned National Security Minister Itamar Ben-Gvir on Monday if any arrests were made in',
            og_url: 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-16T07:59:43+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'mbrown',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'mbrown',
                'Est. reading time': '2 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/'
                        },
                        author: {
                            name: 'mbrown',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81'
                        },
                        headline: 'East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks',
                        datePublished: '2024-04-16T07:59:43+00:00',
                        dateModified: '2024-04-16T07:59:43+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/'
                        },
                        wordCount: 364,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: [
                                    'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#respond'
                                ]
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/',
                        url: 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/',
                        name: 'East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-16T07:59:43+00:00',
                        dateModified: '2024-04-16T07:59:43+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: [
                                    'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/'
                                ]
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/east-jerusalem-palestinians-celebrate-iranian-attack-on-israel-with-fireworks/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'East Jerusalem Palestinians Celebrate Iranian Attack on Israel with Fireworks'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81',
                        name: 'mbrown',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            caption: 'mbrown'
                        },
                        url: 'https://www.bridgesforpeace.com/author/mbrown/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_3_fireworks_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VIK',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221882'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/9632'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221882'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221882/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221889,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221882/revisions/221889'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221883'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221882'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221882'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221882'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221874,
        date: '2024-04-16T10:55:25',
        date_gmt: '2024-04-16T07:55:25',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221874'
        },
        modified: '2024-04-16T10:55:25',
        modified_gmt: '2024-04-16T07:55:25',
        slug: 'apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/',
        title: {
            rendered: '&#8216;Apocalypse of Bodies;&#8217; Israel Exposes Hamas&#8217;s Atrocities to the Arab World'
        },
        content: {
            rendered:
                '<div id="attachment_221878" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.org_.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221878" class="wp-image-221878 size-medium" title="Chenspec/wikimedia.org " src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.org_.jpg?resize=400%2C225&#038;ssl=1" alt="" width="400" height="225" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.org_.jpg?resize=400%2C225&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.org_.jpg?resize=600%2C338&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.org_.jpg?w=800&amp;ssl=1 800w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221878" class="wp-caption-text">A commemorative display of the Nova Festival, where Hamas massacred and raped innocent civilians</p></div>\n<p>Tuesday, 16 April 2024 | The Foreign Ministry&#8217;s digital division has launched a first-of-its-kind campaign presenting evidence of sexual violence committed by Hamas since October 7 in Arabic. The campaign will be shared through over 20 of the ministry&#8217;s channels in Arabic and various embassies in the Middle East, which altogether have more than five million followers and a weekly exposure of about 10 million views.</p>\n<p>For the campaign, dozens of articles about sexual assaults, testimonies of survivors and released captives as well as stories of emergency teams who witnessed the atrocities were translated into Arabic. Additionally, the report of the UN Special Representative on Sexual Violence in Conflict and Under-Secretary-General of the United Nations, Pramila Patten, confirming the evidence of sexual assaults during the massacre, was also translated.</p>\n<p>Israeli women read the testimonies in Arabic to the camera, not skipping any gruesome detail. One of the testimonies recorded was from a survivor of the Nova music festival massacre: &#8220;It was an apocalypse of bodies, girls without clothes, no tops, no bottoms. People cut in half, decapitated heads. There were girls whose pelvis was simply shattered from being raped, girls in positions of splits, with broken legs.&#8221;</p>\n<p>The project emphasizes the comparison between Hamas&#8217;s crimes against Israeli women and those of ISIS against Yazidi women in Iraq, since the Arab world was aware of the crimes against humanity by the Islamic State. Both terrorist organizations share similar modus operandi, including abduction, captivity, human trafficking, sexual abuse, rape and violence.</p>\n<p>All translated materials will be posted on an Arabic language website to serve as a source of knowledge and to facilitate public discourse regarding the massacre. According to the Foreign Ministry, anyone who is currently watching television channels in the Arab world or browsing leading news sites in the Middle East will not find any mention of Hamas&#8217;s sexual crimes on October 7. For example, the UN report, which presents evidence, was suppressed and did not receive any exposure in the mainstream Arab media.</p>\n<p>Additionally, a debate has been ongoing for several months regarding the Qatari network <em>Al Jazeera&#8217;s</em> shielding of Hamas. The network has accused the Israel Defense Forces (IDF) of committing sexual crimes against Palestinians and later had to retract the statement without apologizing for their mistake.</p>\n<p>Israeli Foreign Minister Israel Katz addressed the campaign, saying, &#8220;The sexual crimes committed by Hamas on October 7 must be known internationally. The Arab media refrains from covering Hamas&#8217;s crimes at all, let alone the sexual crimes in particular, creating a void and perpetuating an anti-Israeli narrative among Arabic-speaking audiences. Our goal is to combat the deniers of the massacre and to bring the crimes to the attention of wider audiences worldwide.&#8221;</p>\n<p>Director of the Digital Diplomacy Bureau in the Foreign Ministry, David Saranga, added: &#8220;Until October 7, we dealt with &#8216;soft&#8217; topics that focused on coexistence, innovation, history and culture. In the past six months, we realized that our lives will not be the same. We feel a wrench in the stomach every time we hear testimony like this and so should the Arab world. This is a sensitive topic that includes cultural nuances that are taboo in the Arab world, requiring great sensitivity from the digital team.&#8221;</p>\n<p>The Foreign Ministry operates on several social media platforms like Facebook, X (formerly Twitter), Instagram, TikTok and YouTube, with more than five million followers from the Arab world. Since the beginning of the war, more than 5,000 posts in Arabic have been published, receiving over half a billion views.</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Tuesday, 16 April 2024 | The Foreign Ministry&#8217;s digital division has launched a first-of-its-kind campaign presenting evidence of sexual violence committed by Hamas since October 7 in Arabic. The campaign will be shared through over 20 of the ministry&#8217;s channels in Arabic and various embassies in the Middle East, which altogether have more than five<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 9632,
        featured_media: 221875,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>&#039;Apocalypse of Bodies;&#039; Israel Exposes Hamas&#039;s Atrocities to the Arab World - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="&#039;Apocalypse of Bodies;&#039; Israel Exposes Hamas&#039;s Atrocities to the Arab World - Bridges for Peace" />\n<meta property="og:description" content="Tuesday, 16 April 2024 | The Foreign Ministry&#8217;s digital division has launched a first-of-its-kind campaign presenting evidence of sexual violence committed by Hamas since October 7 in Arabic. The campaign will be shared through over 20 of the ministry&#8217;s channels in Arabic and various embassies in the Middle East, which altogether have more than five" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-16T07:55:25+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="mbrown" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="mbrown" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="4 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/"},"author":{"name":"mbrown","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81"},"headline":"&#8216;Apocalypse of Bodies;&#8217; Israel Exposes Hamas&#8217;s Atrocities to the Arab World","datePublished":"2024-04-16T07:55:25+00:00","dateModified":"2024-04-16T07:55:25+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/"},"wordCount":609,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/","url":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/","name":"\'Apocalypse of Bodies;\' Israel Exposes Hamas\'s Atrocities to the Arab World - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-16T07:55:25+00:00","dateModified":"2024-04-16T07:55:25+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"&#8216;Apocalypse of Bodies;&#8217; Israel Exposes Hamas&#8217;s Atrocities to the Arab World"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81","name":"mbrown","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","caption":"mbrown"},"url":"https://www.bridgesforpeace.com/author/mbrown/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: "'Apocalypse of Bodies;' Israel Exposes Hamas's Atrocities to the Arab World - Bridges for Peace",
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: "'Apocalypse of Bodies;' Israel Exposes Hamas's Atrocities to the Arab World - Bridges for Peace",
            og_description:
                'Tuesday, 16 April 2024 | The Foreign Ministry&#8217;s digital division has launched a first-of-its-kind campaign presenting evidence of sexual violence committed by Hamas since October 7 in Arabic. The campaign will be shared through over 20 of the ministry&#8217;s channels in Arabic and various embassies in the Middle East, which altogether have more than five',
            og_url: 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-16T07:55:25+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'mbrown',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'mbrown',
                'Est. reading time': '4 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/'
                        },
                        author: {
                            name: 'mbrown',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81'
                        },
                        headline: '&#8216;Apocalypse of Bodies;&#8217; Israel Exposes Hamas&#8217;s Atrocities to the Arab World',
                        datePublished: '2024-04-16T07:55:25+00:00',
                        dateModified: '2024-04-16T07:55:25+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/'
                        },
                        wordCount: 609,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: [
                                    'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#respond'
                                ]
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/',
                        url: 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/',
                        name: "'Apocalypse of Bodies;' Israel Exposes Hamas's Atrocities to the Arab World - Bridges for Peace",
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-16T07:55:25+00:00',
                        dateModified: '2024-04-16T07:55:25+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/apocalypse-of-bodies-israel-exposes-hamass-atrocities-to-the-arab-world/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: '&#8216;Apocalypse of Bodies;&#8217; Israel Exposes Hamas&#8217;s Atrocities to the Arab World'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81',
                        name: 'mbrown',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            caption: 'mbrown'
                        },
                        url: 'https://www.bridgesforpeace.com/author/mbrown/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr16_4_novamemorial_wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VIC',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221874'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/9632'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221874'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221874/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221881,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221874/revisions/221881'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221875'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221874'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221874'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221874'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221853,
        date: '2024-04-15T11:42:53',
        date_gmt: '2024-04-15T08:42:53',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221853'
        },
        modified: '2024-04-15T11:42:53',
        modified_gmt: '2024-04-15T08:42:53',
        slug: 'all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/',
        title: {
            rendered: 'All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack'
        },
        content: {
            rendered:
                '<div id="attachment_221823" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1_Wikimedia_Ballistic.jpg-use.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221823" class="wp-image-221823 size-medium" title="TasnimNewsAgency/wikimedia.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1_Wikimedia_Ballistic.jpg-use.jpg?resize=400%2C300&#038;ssl=1" alt="" width="400" height="300" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1_Wikimedia_Ballistic.jpg-use.jpg?resize=400%2C300&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1_Wikimedia_Ballistic.jpg-use.jpg?resize=600%2C449&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1_Wikimedia_Ballistic.jpg-use.jpg?w=800&amp;ssl=1 800w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221823" class="wp-caption-text">Iran launched more than 300 projectiles, including 120 ballistic missiles, on Israel (illustrative).</p></div>\n<p>Monday, 15 April 2024 | “Mommyyyyyyyyyyyy!” It was the distressed wail of a toddler mid-nightmare that woke me. Surfacing from a fog of sleep, I shuffled to Lily’s bedside, hoping to settle her quickly. That’s when the earth moved. Odd, I thought. Had the construction crew building the park down the road taken to working through the night? (Funny how your mind works when its only half awake.) And then the air raid siren screamed.</p>\n<p>It hardly came as a surprise, of course. We all knew an Iranian attack was a matter of when, not if. And every credible intelligence source on the globe had put the timeframe at 24 to 48 hours. In that sense, Iran was nothing if not predictable. We just didn’t know where exactly the <em>ayatollahs </em>would strike and what their weapon of choice would be.</p>\n<p>On Friday and Saturday evening, we went to bed prepared. Everyone in Israel did. Plans were made in advance: mom would grab the girls from their beds, while dad helped grandma. Logistics like these are crucial when you’ve got seconds to make it to safety. Bomb shelters were stocked with water, blankets and games for the kids. Some even filled buckets with kitty litter. One wanted to be prepared if the Iranian attack became a protracted affair and nature called.</p>\n<p>Oh, make no mistake. This isn’t the first time Israel braced for eminent attack. Far from it. And so the waiting came with the typical Jewish dark humor: “Can Iran please provide a timeline for our annihilation? Do we start cleaning for Passover or not?” What else are you going to do? It’s laugh or cry.</p>\n<p>And then it happened. At 23:00 p.m. on Saturday night, Israel Defense Forces Spokesperson (IDF) Rear Adm. Daniel Hagari told his people that in the first-ever direct attack on Israel by Iran, the Islamic Republic had launched hundreds of projectiles on the Jewish state. Numerous fighter jets had scrambled to the skies as the military worked to intercept whatever Iran sent our way.</p>\n<p>The first air raid sirens screamed through southern Israel around 1:42 a.m, and moments later resounded throughout large swatches of the country. Loud booms testified to the Iron Dome at work in the north and south of the country, as well as in Jerusalem and towns across Judea and Samaria, or what the world calls the West Bank.</p>\n<p>As we settled into the shelter, with too many adults, teenagers, children, toddlers and dogs crammed into a confined space, the details began to emerge. Suicide drones, cruise missiles and ballistic missiles fired from Iran and Iraq. Airspace over Israel, Jordan, Egypt and Lebanon closed. Drones falling short and crashing into Syria, Lebanon, Iraq and Iran itself. Projectiles lighting up the night sky over the Al-Aqsa Mosque—the third holiest spot in Islam—while Israel’s Iron Dome met them midair. All to the soundtrack of warplanes screaming through the sky.</p>\n<p>By 3:00 a.m. it was all over. And although the stats were still being tallied, enough was known at this early stage to classify Iran’s big strike on its arch enemy a historic military flop—and Israel’s defense a spectacular miracle.</p>\n<p>The stats were in by sunrise. More than 300 Iranian projectiles launched, comprising 170 drones, 30 cruise missiles and 120 ballistic missiles, with more than 99% of them meeting a fiery end as air defenses shot them from the sky. None of the drones or cruise missiles made it across Israel’s borders, while the majority of ballistic missiles were shot down outside the Earth’s atmosphere. In what can only be described as a tremendous show of regional and international support—and a blatant slap in Tehran’s face—the US, the UK, France and Jordan fought alongside the Jewish state to intercept the projectiles heading for the Promised Land.</p>\n<p>“The Iranian threat met the aerial and technological superiority of the IDF, combined with a strong fighting coalition, which together intercepted the vast majority of the threats,” Hagari said during a press briefing this morning.</p>\n<p>According to the IDF, Israel’s long-range Arrow air defense system took care of the “vast majority” of the 120 ballistic missiles, but some circumvented Israel’s defensive shield, striking the Nevatim Airbase in southern Israel and causing minor damage.</p>\n<p>As for casualties and injuries, Magen David Adom, Israel’s ambulance and emergency service, said it had treated a 7-year-old Bedouin girl who was wounded in her home by shrapnel after the interception of an Iranian ballistic missile over the area. She was taken to a hospital in Beersheva and is currently fighting for her life.</p>\n<p>In the aftermath of what social media has dubbed the most expensive Persian firework display in human history, one burning question remains: whether and how Israel will respond.</p>\n<p>Prime Minister Benjamin Netanyahu, Defense Minister Yoav Galant and Minister Benny Gantz were authorized by the Israeli War Cabinet to propose a response. Their proposition hinges on more than merely striking back at an enemy nation that fired 300 projectiles at sleeping civilians in what constitutes an open declaration of war.</p>\n<p>On the one hand, Israel must deter Iran. And in the Middle East, the only language of deterrence is an iron fist. Iran has been striking at Israel behind the scenes and via its terror proxies Hamas, Hezbollah and the like for decades. The shadow war between the sons of Judah and the sons of Persia has raged unabated for more than 45 years. Yet the attacks were never direct. On Sunday morning, they were. Israel cannot afford to show weakness. And make no mistake, failure to respond would be considered a sign of weakness—in the eyes of the <em>ayatollahs</em>, their allies and Israel’s neighbors in the region who are mulling normalizing ties with Jerusalem.</p>\n<p>On the other hand, the US, the UK, France, Germany and Canada have all demanded in no uncertain terms that Israel refrain from a “disproportionate” response that could threaten the stability in the region. An iron fist in the form of a strong retaliation that signals Israel’s strength to its neighbors could thus alienate Jerusalem’s rather reluctant allies internationally. And with these allies serving as a defensive belt on Israel’s borders as the Iranian projectiles headed our way, Jerusalem will think long and hard about forfeiting these friends.</p>\n<p>At the same time, Israel is also embroiled in a war aimed at dismantling Hamas in Gaza. Opening a new front with Iran would take the spotlight off Hamas and force Israel to shift focus mid-campaign, which would allow the terror group to regroup and return later for the promised round two of October 7. As a result, Jerusalem might well consider heeding its international allies’ advice, bite the bullet and turn a blind eye to the Iranian attack—for the time being.</p>\n<p>And so we wait. Regardless of whether the Middle East erupts into open warfare over the coming days or whether we return to open war on just one front, one thing is certain: we have turned a corner.</p>\n<p>On Sunday night, as the earth shook and the warplanes screamed overhead, we witnessed history in the making—which is indeed saying something. International leaders and world bodies have called the conflict in the Middle East the question of our time, the conflict of our generation. How arrogant we are. The opening shots of this war were fired thousands of years ago when God chose a people through which He would make Himself known to the world, a people He would use as the human instrument through which to bring salvation to all of mankind. And according to the Bible, it will rage in increasing intensity until the day Jesus returns to set the wrong right and rule and reign. This war has always been spiritual, a clash between the darkness and the Light.</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Monday, 15 April 2024 | “Mommyyyyyyyyyyyy!” It was the distressed wail of a toddler mid-nightmare that woke me. Surfacing from a fog of sleep, I shuffled to Lily’s bedside, hoping to settle her quickly. That’s when the earth moved. Odd, I thought. Had the construction crew building the park down the road taken to working<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 1644,
        featured_media: 221826,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack - Bridges for Peace" />\n<meta property="og:description" content="Monday, 15 April 2024 | “Mommyyyyyyyyyyyy!” It was the distressed wail of a toddler mid-nightmare that woke me. Surfacing from a fog of sleep, I shuffled to Lily’s bedside, hoping to settle her quickly. That’s when the earth moved. Odd, I thought. Had the construction crew building the park down the road taken to working" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-15T08:42:53+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="istrauss" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="istrauss" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="7 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/"},"author":{"name":"istrauss","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0"},"headline":"All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack","datePublished":"2024-04-15T08:42:53+00:00","dateModified":"2024-04-15T08:42:53+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/"},"wordCount":1337,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/","url":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/","name":"All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-15T08:42:53+00:00","dateModified":"2024-04-15T08:42:53+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0","name":"istrauss","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","caption":"istrauss"},"url":"https://www.bridgesforpeace.com/author/istrauss/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack - Bridges for Peace',
            og_description:
                'Monday, 15 April 2024 | “Mommyyyyyyyyyyyy!” It was the distressed wail of a toddler mid-nightmare that woke me. Surfacing from a fog of sleep, I shuffled to Lily’s bedside, hoping to settle her quickly. That’s when the earth moved. Odd, I thought. Had the construction crew building the park down the road taken to working',
            og_url: 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-15T08:42:53+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'istrauss',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'istrauss',
                'Est. reading time': '7 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/'
                        },
                        author: {
                            name: 'istrauss',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0'
                        },
                        headline: 'All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack',
                        datePublished: '2024-04-15T08:42:53+00:00',
                        dateModified: '2024-04-15T08:42:53+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/'
                        },
                        wordCount: 1337,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: [
                                    'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#respond'
                                ]
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/',
                        url: 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/',
                        name: 'All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-15T08:42:53+00:00',
                        dateModified: '2024-04-15T08:42:53+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/all-eyes-on-israel-in-the-aftermath-of-first-ever-direct-iranian-attack/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'All Eyes on Israel in the Aftermath of First-ever Direct Iranian Attack'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0',
                        name: 'istrauss',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            caption: 'istrauss'
                        },
                        url: 'https://www.bridgesforpeace.com/author/istrauss/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_1SQ_Wikimedia_Ballistic.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VIh',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221853'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/1644'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221853'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221853/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221854,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221853/revisions/221854'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221826'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221853'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221853'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221853'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221851,
        date: '2024-04-15T11:33:45',
        date_gmt: '2024-04-15T08:33:45',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221851'
        },
        modified: '2024-04-15T11:33:45',
        modified_gmt: '2024-04-15T08:33:45',
        slug: 'iranian-missile-fragments-found-scattered-across-middle-east',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/',
        title: {
            rendered: 'Iranian Missile Fragments Found Scattered Across Middle East'
        },
        content: {
            rendered:
                '<div id="attachment_221829" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2_Wikimedia_Dones.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221829" class="wp-image-221829 size-medium" title="Mostafa Tehrani/wikimedia.org " src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2_Wikimedia_Dones.jpg?resize=400%2C279&#038;ssl=1" alt="" width="400" height="279" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2_Wikimedia_Dones.jpg?resize=400%2C279&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2_Wikimedia_Dones.jpg?resize=600%2C418&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2_Wikimedia_Dones.jpg?w=800&amp;ssl=1 800w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221829" class="wp-caption-text">None of the 170 drones Iran launched on Israel entered Israeli airspace (illustrative).</p></div>\n<p>Monday, 15 April 2024 | As the Iranian attack against Israel began in the early hours of Sunday, videos of missiles and rockets being fired circulated on social media. Most of these videos were filmed in Iraq, unsurprising given the proximity of the areas.</p>\n<p>A local journalist shared on X photos of missile fragments and hollow pipes, noting that two Iranian missiles fell on Iraqi soil: one in Al-Yusufiyah southwest of Baghdad, and the other in Rowanduz in the northern Erbil province. He later uploaded another video, claiming it showed an Iranian missile that crashed in Erbil.</p>\n<p>Saudi channel <em>Al Hadath</em> reported on Sunday that an Iranian drone launched as part of the attack on Israel was found in the city of Al-Najaf in Iraq, according to a security source.</p>\n<p>The Jordanian parliament issued a statement urging various media outlets to report accurate information and avoid spreading rumors that could stoke an atmosphere of fear.</p>\n<p>The statement noted that some of the Iranian missiles that entered Jordanian airspace were dealt with and removed to prevent danger to citizens and residential neighborhoods. &#8220;Some debris fell in several places without causing significant damage or injuries. The only step taken was the temporary closure of Jordanian airspace,&#8221; it claimed.</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Monday, 15 April 2024 | As the Iranian attack against Israel began in the early hours of Sunday, videos of missiles and rockets being fired circulated on social media. Most of these videos were filmed in Iraq, unsurprising given the proximity of the areas. A local journalist shared on X photos of missile fragments and<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 1644,
        featured_media: 221832,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Iranian Missile Fragments Found Scattered Across Middle East - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Iranian Missile Fragments Found Scattered Across Middle East - Bridges for Peace" />\n<meta property="og:description" content="Monday, 15 April 2024 | As the Iranian attack against Israel began in the early hours of Sunday, videos of missiles and rockets being fired circulated on social media. Most of these videos were filmed in Iraq, unsurprising given the proximity of the areas. A local journalist shared on X photos of missile fragments and" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-15T08:33:45+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="istrauss" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="istrauss" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="2 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/"},"author":{"name":"istrauss","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0"},"headline":"Iranian Missile Fragments Found Scattered Across Middle East","datePublished":"2024-04-15T08:33:45+00:00","dateModified":"2024-04-15T08:33:45+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/"},"wordCount":230,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/","url":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/","name":"Iranian Missile Fragments Found Scattered Across Middle East - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-15T08:33:45+00:00","dateModified":"2024-04-15T08:33:45+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"Iranian Missile Fragments Found Scattered Across Middle East"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0","name":"istrauss","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","caption":"istrauss"},"url":"https://www.bridgesforpeace.com/author/istrauss/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'Iranian Missile Fragments Found Scattered Across Middle East - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'Iranian Missile Fragments Found Scattered Across Middle East - Bridges for Peace',
            og_description:
                'Monday, 15 April 2024 | As the Iranian attack against Israel began in the early hours of Sunday, videos of missiles and rockets being fired circulated on social media. Most of these videos were filmed in Iraq, unsurprising given the proximity of the areas. A local journalist shared on X photos of missile fragments and',
            og_url: 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-15T08:33:45+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'istrauss',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'istrauss',
                'Est. reading time': '2 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/'
                        },
                        author: {
                            name: 'istrauss',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0'
                        },
                        headline: 'Iranian Missile Fragments Found Scattered Across Middle East',
                        datePublished: '2024-04-15T08:33:45+00:00',
                        dateModified: '2024-04-15T08:33:45+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/'
                        },
                        wordCount: 230,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: ['https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#respond']
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/',
                        url: 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/',
                        name: 'Iranian Missile Fragments Found Scattered Across Middle East - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-15T08:33:45+00:00',
                        dateModified: '2024-04-15T08:33:45+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/iranian-missile-fragments-found-scattered-across-middle-east/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Iranian Missile Fragments Found Scattered Across Middle East'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0',
                        name: 'istrauss',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            caption: 'istrauss'
                        },
                        url: 'https://www.bridgesforpeace.com/author/istrauss/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_2SQ_Wikimedia_Dones.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VIf',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221851'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/1644'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221851'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221851/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221852,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221851/revisions/221852'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221832'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221851'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221851'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221851'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221848,
        date: '2024-04-15T11:30:38',
        date_gmt: '2024-04-15T08:30:38',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221848'
        },
        modified: '2024-04-15T11:30:38',
        modified_gmt: '2024-04-15T08:30:38',
        slug: 'israel-confirms-hamas-rejection-of-hostage-deal',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/',
        title: {
            rendered: 'Israel Confirms Hamas Rejection of Hostage Deal'
        },
        content: {
            rendered:
                '<div id="attachment_221835" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3_JNS_Hostages.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221835" class="wp-image-221835 size-medium" title="Yonatan Sindel/Flash90/jns.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3_JNS_Hostages.jpg?resize=400%2C267&#038;ssl=1" alt="" width="400" height="267" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3_JNS_Hostages.jpg?resize=400%2C267&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3_JNS_Hostages.jpg?resize=1024%2C683&amp;ssl=1 1024w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3_JNS_Hostages.jpg?resize=600%2C400&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3_JNS_Hostages.jpg?w=1320&amp;ssl=1 1320w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221835" class="wp-caption-text">Israelis marking six months since the Hamas-led October 7 invasion.</p></div>\n<p>Monday, 15 April 2024 | Israeli Prime Minister Benjamin Netanyahu confirmed early on Sunday morning that Hamas has rejected the latest US-mediated hostages-for-cease-fire proposal.</p>\n<p>“It has been over a week since the Cairo meeting—Hamas has rejected the outline that was tabled by the mediators,” said Netanyahu’s office.</p>\n<p>“The rejection of the proposal by the three mediators [United States, Egypt and Qatar], which included the most significant flexibility on Israel’s part, proves that [Hamas chief in Gaza Yahya] Sinwar does not want a humanitarian deal and the return of the hostages, is continuing to exploit the tension with Iran and is striving to unite the sectors and achieve a general escalation in the region,” the statement continued.</p>\n<p>“Israel will continue to strive to realize the objectives of the war with Hamas with full force, and leave no stone unturned to return the 133 hostages from Gaza forthwith,” it concluded.</p>\n<p>According to reports, the latest proposal would have seen Jerusalem release 900 terrorist prisoners, including murderers, in exchange for 40 hostages, along with a partial IDF withdrawal from the Gaza Strip and the unrestricted return of Palestinians to the northern part of the coastal enclave.</p>\n<p>The plan proposed that Hamas would release more hostages at a later stage following the withdrawal of all Israeli troops from Gaza.</p>\n<p>Hamas has stuck to its maximalist demands throughout the process, demands that Jerusalem has called “delusional” and which include a “permanent ceasefire,” an Israeli military withdrawal from the coastal enclave, a return of displaced Gazans and the release of hundreds of terrorists from Israeli prisons.</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Monday, 15 April 2024 | Israeli Prime Minister Benjamin Netanyahu confirmed early on Sunday morning that Hamas has rejected the latest US-mediated hostages-for-cease-fire proposal. “It has been over a week since the Cairo meeting—Hamas has rejected the outline that was tabled by the mediators,” said Netanyahu’s office. “The rejection of the proposal by the three<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 1644,
        featured_media: 221838,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Israel Confirms Hamas Rejection of Hostage Deal - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Israel Confirms Hamas Rejection of Hostage Deal - Bridges for Peace" />\n<meta property="og:description" content="Monday, 15 April 2024 | Israeli Prime Minister Benjamin Netanyahu confirmed early on Sunday morning that Hamas has rejected the latest US-mediated hostages-for-cease-fire proposal. “It has been over a week since the Cairo meeting—Hamas has rejected the outline that was tabled by the mediators,” said Netanyahu’s office. “The rejection of the proposal by the three" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-15T08:30:38+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="istrauss" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="istrauss" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="2 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/"},"author":{"name":"istrauss","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0"},"headline":"Israel Confirms Hamas Rejection of Hostage Deal","datePublished":"2024-04-15T08:30:38+00:00","dateModified":"2024-04-15T08:30:38+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/"},"wordCount":280,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/","url":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/","name":"Israel Confirms Hamas Rejection of Hostage Deal - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-15T08:30:38+00:00","dateModified":"2024-04-15T08:30:38+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"Israel Confirms Hamas Rejection of Hostage Deal"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0","name":"istrauss","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","caption":"istrauss"},"url":"https://www.bridgesforpeace.com/author/istrauss/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'Israel Confirms Hamas Rejection of Hostage Deal - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'Israel Confirms Hamas Rejection of Hostage Deal - Bridges for Peace',
            og_description:
                'Monday, 15 April 2024 | Israeli Prime Minister Benjamin Netanyahu confirmed early on Sunday morning that Hamas has rejected the latest US-mediated hostages-for-cease-fire proposal. “It has been over a week since the Cairo meeting—Hamas has rejected the outline that was tabled by the mediators,” said Netanyahu’s office. “The rejection of the proposal by the three',
            og_url: 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-15T08:30:38+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'istrauss',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'istrauss',
                'Est. reading time': '2 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/'
                        },
                        author: {
                            name: 'istrauss',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0'
                        },
                        headline: 'Israel Confirms Hamas Rejection of Hostage Deal',
                        datePublished: '2024-04-15T08:30:38+00:00',
                        dateModified: '2024-04-15T08:30:38+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/'
                        },
                        wordCount: 280,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: ['https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#respond']
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/',
                        url: 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/',
                        name: 'Israel Confirms Hamas Rejection of Hostage Deal - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-15T08:30:38+00:00',
                        dateModified: '2024-04-15T08:30:38+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/israel-confirms-hamas-rejection-of-hostage-deal/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Israel Confirms Hamas Rejection of Hostage Deal'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0',
                        name: 'istrauss',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            caption: 'istrauss'
                        },
                        url: 'https://www.bridgesforpeace.com/author/istrauss/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_3SQ_JNS_Hostages.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VIc',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221848'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/1644'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221848'
                }
            ],
            'version-history': [
                {
                    count: 2,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221848/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221850,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221848/revisions/221850'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221838'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221848'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221848'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221848'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221822,
        date: '2024-04-15T11:27:38',
        date_gmt: '2024-04-15T08:27:38',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221822'
        },
        modified: '2024-04-15T11:27:38',
        modified_gmt: '2024-04-15T08:27:38',
        slug: 'global-clients-flock-to-israeli-defense-firms-following-iran-attack',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/',
        title: {
            rendered: 'Global Clients Flock to Israeli Defense Firms Following Iran Attack'
        },
        content: {
            rendered:
                '<div id="attachment_221844" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221844" class="wp-image-221844 size-medium" title=" התעשייה האווירית/wikimedia.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?resize=400%2C400&#038;ssl=1" alt="" width="400" height="400" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?resize=400%2C400&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?resize=150%2C150&amp;ssl=1 150w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?resize=100%2C100&amp;ssl=1 100w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?w=500&amp;ssl=1 500w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221844" class="wp-caption-text">IAI CEO Boaz Levy</p></div>\n<p>Monday, 15 April 2024 | The successful interception of swarms of missiles and drones fired from Iran toward Israel by the Israel Aerospace Industries (IAI)-produced Arrow system, among others, has sparked significant global interest.</p>\n<p>&#8220;It&#8217;s a day of pride for many of our employees, who work day and night and in the end, everything converges to one event,&#8221; IAI CEO Boaz Levy told <em>Ynet</em> in an interview, adding that the company has received numerous supportive phone calls from customers worldwide before and after the attack, expressing their appreciation for the performance of the system.</p>\n<p>Levy highlighted the unprecedented nature of the attack, noting, &#8220;Yesterday was an attack the world had not known like it: the number of simultaneous threats, even in the Ukraine–Russia war, there were no attacks in such numbers and not in such a complex scenario of a number of threats of different types.&#8221; He commended the phenomenal 99% success rate of air defenses.</p>\n<p>Former financial advisor to the IDF chief of staff Brig. Gen. Reem Aminoach pegged the total cost of the interception operation at &#8220;NIS 4–5 billion &#8221; (US $1–1.3 million).</p>\n<p>&#8220;We provide a sophisticated and innovative system, it does not cost a million dollars but it is not cheap,&#8221; Levy says. &#8220;The price is not the issue here. Anyone who wants to defend themselves needs to look at the potential damage versus the benefit. That&#8217;s the right calculation.</p>\n<p>&#8220;I don&#8217;t know how much the activity cost that night and I don&#8217;t think anyone in such a short period of time knows how to estimate the price. At times like this, you don&#8217;t look at the direct cost, but what would have happened and the damage that would have been if they had hit population centers or sensitive facilities. A country like Israel that needs to defend itself must have defensive weapons.&#8221;</p>\n<p>&#8220;Sunday’s attack comprised three types of threats: drones carrying relatively small warheads, cruise missiles and ballistic missiles. The Arrow system, which we have developed, is designed specifically to counter ballistic missiles. These pose the primary threat and carry the highest level of risk due to their high speed, quick arrival time—within 12 minutes from Iran, and the potential for large-scale damage due to the hundreds of kilograms of warheads they carry.</p>\n<p>&#8220;Israel was targeted with dozens of these long-range ballistic missiles, and the Arrow system addressed this threat, from the detection of the threat by radar to managing the event, and finally launching the missiles. Arrow 2 targets at a relatively low altitude, still outside the atmosphere, and Arrow 3 targets at a very high altitude. The combination of these two systems provides a level of flexibility. For example, if a missile isn&#8217;t intercepted at a high altitude, it can still be intercepted at a lower altitude.&#8221;</p>\n<p>&#8220;We are already on an upward trend: in 2023, our order backlog totaled US $18 billion and our sales turnover was US $5.3 billion. Seventy-one percent of our sales turnover is destined for export. It&#8217;s clear that there are numerous conflicts around the world and numerous defense systems are needed. Our Arrow system is in demand and we have been marketing it to overseas customers for years.</p>\n<p>&#8220;In my previous role in the IAI, I was the program manager and chief engineer of Arrow, and I know the system intimately. The Arrow project, which began in the late 80s as a feasibility study to determine if it was possible to intercept a missile with another missile, was the first of its kind in the world and was developed in partnership with the US government. This was followed by the development of Arrow 2 and Arrow 3.</p>\n<p>&#8220;I anticipate that after the war there will be further orders for the Iron Beam system, which includes the radars that detect the missiles and the launchers. The system isn&#8217;t cheap, but it&#8217;s essential for those who want to defend themselves.&#8221;</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Monday, 15 April 2024 | The successful interception of swarms of missiles and drones fired from Iran toward Israel by the Israel Aerospace Industries (IAI)-produced Arrow system, among others, has sparked significant global interest. &#8220;It&#8217;s a day of pride for many of our employees, who work day and night and in the end, everything converges<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 1644,
        featured_media: 221844,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Global Clients Flock to Israeli Defense Firms Following Iran Attack - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Global Clients Flock to Israeli Defense Firms Following Iran Attack - Bridges for Peace" />\n<meta property="og:description" content="Monday, 15 April 2024 | The successful interception of swarms of missiles and drones fired from Iran toward Israel by the Israel Aerospace Industries (IAI)-produced Arrow system, among others, has sparked significant global interest. &#8220;It&#8217;s a day of pride for many of our employees, who work day and night and in the end, everything converges" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-15T08:27:38+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="istrauss" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="istrauss" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="4 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/"},"author":{"name":"istrauss","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0"},"headline":"Global Clients Flock to Israeli Defense Firms Following Iran Attack","datePublished":"2024-04-15T08:27:38+00:00","dateModified":"2024-04-15T08:27:38+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/"},"wordCount":660,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/","url":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/","name":"Global Clients Flock to Israeli Defense Firms Following Iran Attack - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-15T08:27:38+00:00","dateModified":"2024-04-15T08:27:38+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"Global Clients Flock to Israeli Defense Firms Following Iran Attack"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0","name":"istrauss","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g","caption":"istrauss"},"url":"https://www.bridgesforpeace.com/author/istrauss/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'Global Clients Flock to Israeli Defense Firms Following Iran Attack - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'Global Clients Flock to Israeli Defense Firms Following Iran Attack - Bridges for Peace',
            og_description:
                'Monday, 15 April 2024 | The successful interception of swarms of missiles and drones fired from Iran toward Israel by the Israel Aerospace Industries (IAI)-produced Arrow system, among others, has sparked significant global interest. &#8220;It&#8217;s a day of pride for many of our employees, who work day and night and in the end, everything converges',
            og_url: 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-15T08:27:38+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'istrauss',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'istrauss',
                'Est. reading time': '4 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/'
                        },
                        author: {
                            name: 'istrauss',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0'
                        },
                        headline: 'Global Clients Flock to Israeli Defense Firms Following Iran Attack',
                        datePublished: '2024-04-15T08:27:38+00:00',
                        dateModified: '2024-04-15T08:27:38+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/'
                        },
                        wordCount: 660,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: [
                                    'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#respond'
                                ]
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/',
                        url: 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/',
                        name: 'Global Clients Flock to Israeli Defense Firms Following Iran Attack - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-15T08:27:38+00:00',
                        dateModified: '2024-04-15T08:27:38+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/global-clients-flock-to-israeli-defense-firms-following-iran-attack/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Global Clients Flock to Israeli Defense Firms Following Iran Attack'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/e1104025f047fca916347017afde88b0',
                        name: 'istrauss',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/dd2afd69bfe38607e4e4c5a269c37531?s=96&d=mm&r=g',
                            caption: 'istrauss'
                        },
                        url: 'https://www.bridgesforpeace.com/author/istrauss/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_15-April_4SQ_Wikimedia_BoazLevy.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VHM',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221822'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/1644'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221822'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221822/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221847,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221822/revisions/221847'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221844'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221822'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221822'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221822'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221764,
        date: '2024-04-12T12:41:56',
        date_gmt: '2024-04-12T09:41:56',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221764'
        },
        modified: '2024-04-12T12:41:56',
        modified_gmt: '2024-04-12T09:41:56',
        slug: 'us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/',
        title: {
            rendered: 'US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack'
        },
        content: {
            rendered:
                '<div id="attachment_221768" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.org_.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221768" class="wp-image-221768 size-medium" title="Saeediex/Shutterstock/jns.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.org_.jpg?resize=400%2C225&#038;ssl=1" alt="" width="400" height="225" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.org_.jpg?resize=400%2C225&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.org_.jpg?resize=600%2C338&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.org_.jpg?w=880&amp;ssl=1 880w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221768" class="wp-caption-text">Iranian missiles on display at a Quds Day rally in Tehran</p></div>\n<p>Friday, 12 April 2024 | US Defense Secretary Lloyd Austin reiterated on Thursday Washington’s “ironclad” commitment to upholding Israel’s security, as the Israel Defense Forces [IDF] continued preparations for an expected Iranian attack on the home front.</p>\n<p>Austin spoke with Israeli Defense Minister Yoav Gallant “to reiterate ironclad US support for Israel’s defense in the face of growing threats from Iran and its regional proxies,” according to a Pentagon readout of their call.</p>\n<p>“Echoing President Biden’s unequivocal message to Israeli Prime Minister Netanyahu, Secretary Austin assured Minister Gallant that Israel could count on full US support to defend Israel against Iranian attacks, which Tehran has publicly threatened,” added the statement.</p>\n<p>On Wednesday, US President Joe Biden said his administration was committed to backing Israel amid reports of an imminent Iranian attack.</p>\n<p>“As I told Prime Minister Netanyahu, our commitment to Israel’s security against these threats from Iran and its proxies is ironclad,” said Biden.</p>\n<p>“Let me say it again, ironclad. We’re going to do all we can to protect Israel’s security,” he added.</p>\n<p>Washington and its allies believe a major attack on Israel by Iran has become a matter of when, not if, following the killing of an Iranian general in Syria on April 1, which Tehran blamed on the Jewish state.</p>\n<p>Israel has not officially taken responsibility for the attack in Damascus which killed Brig. Gen. Mohammad Zahedi, but four officials told the <em>New York Times </em>last week that Jerusalem ordered the strike.</p>\n<p>On Thursday, Austin and Gallant “discussed readiness for an Iranian attack against the State of Israel, which could lead to regional escalation. Gallant detailed preparations and emphasized that the State of Israel will not tolerate an Iranian attack on its territory,” according to an Israeli readout.</p>\n<p>The defense minister also stressed that “a direct Iranian attack on Israeli territory would require an appropriate Israeli response against Iran.”</p>\n<p>Gen. Erik Kurilla, commander of the US Central Command [CENTCOM], which oversees the Middle East, arrived in Israel on Thursday to coordinate with the IDF regarding a possible attack.</p>\n<p>Jerusalem is preparing for an attack—“possibly on Israeli soil”—in the next 24 to 48 hours, the <em>Wall Street Journal</em> reported on Thursday, citing US intelligence.</p>\n<p>The US Embassy in Jerusalem announced on Thursday that “out of an abundance of caution,” US government employees and their family members can only travel for personal reasons in the greater Tel Aviv, Jerusalem and Beersheva areas “until further notice.”</p>\n<p>On Thursday evening, IDF Spokesman Rear Adm. Daniel Hagari said that Israel was “highly prepared for various scenarios and we are constantly assessing the situation. We are ready for attack and defense using a variety of capabilities and also with our strategic partners,” he added.</p>\n<p>The IDF has been placed on high alert, resulting in combat soldiers’ weekend leaves being canceled and the military calling up additional reserve soldiers to the IDF Aerial Defense Array.</p>\n<p>Israeli Prime Minister Benjamin Netanyahu said on Thursday that the Jewish state would respond in kind to any attack.</p>\n<p>Speaking during a visit to the Tel Nof Air Base, he said, “We are in challenging times. We are in the midst of the war in Gaza, which is continuing at full force, even as we are continuing our relentless efforts to return our hostages.”</p>\n<p>However, he continued, “We are also prepared for scenarios involving challenges in other sectors. We have determined a simple rule: Whoever harms us, we will harm them. We are prepared to meet all of the security needs of the State of Israel, both defensively and offensively.”</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Friday, 12 April 2024 | US Defense Secretary Lloyd Austin reiterated on Thursday Washington’s “ironclad” commitment to upholding Israel’s security, as the Israel Defense Forces [IDF] continued preparations for an expected Iranian attack on the home front. Austin spoke with Israeli Defense Minister Yoav Gallant “to reiterate ironclad US support for Israel’s defense in the<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 9632,
        featured_media: 221765,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack - Bridges for Peace" />\n<meta property="og:description" content="Friday, 12 April 2024 | US Defense Secretary Lloyd Austin reiterated on Thursday Washington’s “ironclad” commitment to upholding Israel’s security, as the Israel Defense Forces [IDF] continued preparations for an expected Iranian attack on the home front. Austin spoke with Israeli Defense Minister Yoav Gallant “to reiterate ironclad US support for Israel’s defense in the" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-12T09:41:56+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="mbrown" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="mbrown" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="4 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/"},"author":{"name":"mbrown","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81"},"headline":"US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack","datePublished":"2024-04-12T09:41:56+00:00","dateModified":"2024-04-12T09:41:56+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/"},"wordCount":623,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/","url":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/","name":"US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-12T09:41:56+00:00","dateModified":"2024-04-12T09:41:56+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81","name":"mbrown","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","caption":"mbrown"},"url":"https://www.bridgesforpeace.com/author/mbrown/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack - Bridges for Peace',
            og_description:
                'Friday, 12 April 2024 | US Defense Secretary Lloyd Austin reiterated on Thursday Washington’s “ironclad” commitment to upholding Israel’s security, as the Israel Defense Forces [IDF] continued preparations for an expected Iranian attack on the home front. Austin spoke with Israeli Defense Minister Yoav Gallant “to reiterate ironclad US support for Israel’s defense in the',
            og_url: 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-12T09:41:56+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'mbrown',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'mbrown',
                'Est. reading time': '4 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/'
                        },
                        author: {
                            name: 'mbrown',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81'
                        },
                        headline: 'US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack',
                        datePublished: '2024-04-12T09:41:56+00:00',
                        dateModified: '2024-04-12T09:41:56+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/'
                        },
                        wordCount: 623,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: [
                                    'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#respond'
                                ]
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/',
                        url: 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/',
                        name: 'US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-12T09:41:56+00:00',
                        dateModified: '2024-04-12T09:41:56+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/us-reiterates-ironclad-support-for-israel-as-idf-preps-for-iranian-attack/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'US Reiterates ‘Ironclad’ Support for Israel as IDF Preps for Iranian Attack'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81',
                        name: 'mbrown',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            caption: 'mbrown'
                        },
                        url: 'https://www.bridgesforpeace.com/author/mbrown/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_1_iran_jns.orgSQ_.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VGQ',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221764'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/9632'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221764'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221764/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221771,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221764/revisions/221771'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221765'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221764'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221764'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221764'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    },
    {
        id: 221756,
        date: '2024-04-12T12:39:05',
        date_gmt: '2024-04-12T09:39:05',
        guid: {
            rendered: 'https://www.bridgesforpeace.com/?p=221756'
        },
        modified: '2024-04-12T12:39:05',
        modified_gmt: '2024-04-12T09:39:05',
        slug: 'sinwar-stalls-hostage-negotiations-waits-for-iran-attack',
        status: 'publish',
        type: 'post',
        link: 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/',
        title: {
            rendered: 'Sinwar Stalls Hostage Negotiations, Waits for Iran Attack'
        },
        content: {
            rendered:
                '<div id="attachment_221760" style="width: 410px" class="wp-caption alignleft"><a href="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.org_.jpg?ssl=1"><img loading="lazy" decoding="async" aria-describedby="caption-attachment-221760" class="wp-image-221760 size-medium" title="Fars Media Corporation/Wikimedia.org" src="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.org_.jpg?resize=400%2C201&#038;ssl=1" alt="" width="400" height="201" srcset="https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.org_.jpg?resize=400%2C201&amp;ssl=1 400w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.org_.jpg?resize=600%2C302&amp;ssl=1 600w, https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.org_.jpg?w=745&amp;ssl=1 745w" sizes="(max-width: 400px) 100vw, 400px" data-recalc-dims="1" /></a><p id="caption-attachment-221760" class="wp-caption-text">Yahya Sinwar, commander of Hamas in the Gaza Strip</p></div>\n<p>Friday, 12 April 2024 | Israeli officials believe Hamas leader Yahya Sinwar is stalling and delaying his response to the latest proposal in the negotiations to free hostages.</p>\n<p>They believe there is not sufficient pressure being put on him to free the Israelis being held by Hamas and that he is waiting to see how Iran intends to strike Israel in retaliation for the killing of a senior IRGC [Islamic Revolutionary Guard Corps] commander in Damascus, in a strike attributed to Israel.</p>\n<p>An extreme Iranian response could lead to an Israeli retaliation and bring about a regional war, which would be the culmination of his intentions and desires, in a united front against Israel.</p>\n<p>&#8220;Hamas may deliver a negative response today or tomorrow,&#8221; an Israeli official said. &#8220;We believe Sinwar hopes for a withdrawal of Israeli troops from Gaza and could achieve an end to the war, a full withdrawal of Israel defense Forces and an influx of humanitarian aid.&#8221;</p>\n<p>A spokesperson for the government said Hamas would be turning down a very reasonable proposal that would bring a lull in the fighting. The War Cabinet is scheduled to meet later on Thursday although it may not be discussing the hostage release talks and instead concentrate on the threat of an Iranian attack.</p>\n<!-- AddThis Advanced Settings generic via filter on the_content --><!-- AddThis Share Buttons generic via filter on the_content -->',
            protected: false
        },
        excerpt: {
            rendered:
                '<p>Friday, 12 April 2024 | Israeli officials believe Hamas leader Yahya Sinwar is stalling and delaying his response to the latest proposal in the negotiations to free hostages. They believe there is not sufficient pressure being put on him to free the Israelis being held by Hamas and that he is waiting to see how<!-- AddThis Advanced Settings generic via filter on wp_trim_excerpt --><!-- AddThis Share Buttons generic via filter on wp_trim_excerpt --></p>\n',
            protected: false
        },
        author: 9632,
        featured_media: 221757,
        comment_status: 'open',
        ping_status: 'open',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {
            episode_type: '',
            audio_file: '',
            cover_image: '',
            cover_image_id: '',
            duration: '',
            filesize: '',
            date_recorded: '',
            explicit: '',
            block: '',
            filesize_raw: '',
            footnotes: '',
            _jetpack_memberships_contains_paid_content: false,
            jetpack_publicize_message: '',
            jetpack_publicize_feature_enabled: true,
            jetpack_social_post_already_shared: true,
            jetpack_social_options: {
                image_generator_settings: {
                    template: 'highway',
                    enabled: false
                }
            }
        },
        categories: [29],
        tags: [],
        jetpack_publicize_connections: [],
        acf: [],
        yoast_head:
            '<!-- This site is optimized with the Yoast SEO plugin v22.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Sinwar Stalls Hostage Negotiations, Waits for Iran Attack - Bridges for Peace</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Sinwar Stalls Hostage Negotiations, Waits for Iran Attack - Bridges for Peace" />\n<meta property="og:description" content="Friday, 12 April 2024 | Israeli officials believe Hamas leader Yahya Sinwar is stalling and delaying his response to the latest proposal in the negotiations to free hostages. They believe there is not sufficient pressure being put on him to free the Israelis being held by Hamas and that he is waiting to see how" />\n<meta property="og:url" content="https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/" />\n<meta property="og:site_name" content="Bridges for Peace" />\n<meta property="article:publisher" content="https://www.facebook.com/bridgesforpeace/" />\n<meta property="article:published_time" content="2024-04-12T09:39:05+00:00" />\n<meta property="og:image" content="https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg" />\n\t<meta property="og:image:width" content="500" />\n\t<meta property="og:image:height" content="500" />\n\t<meta property="og:image:type" content="image/jpeg" />\n<meta name="author" content="mbrown" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:creator" content="@BridgesForPeace" />\n<meta name="twitter:site" content="@BridgesForPeace" />\n<meta name="twitter:label1" content="Written by" />\n\t<meta name="twitter:data1" content="mbrown" />\n\t<meta name="twitter:label2" content="Est. reading time" />\n\t<meta name="twitter:data2" content="2 minutes" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#article","isPartOf":{"@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/"},"author":{"name":"mbrown","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81"},"headline":"Sinwar Stalls Hostage Negotiations, Waits for Iran Attack","datePublished":"2024-04-12T09:39:05+00:00","dateModified":"2024-04-12T09:39:05+00:00","mainEntityOfPage":{"@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/"},"wordCount":234,"commentCount":0,"publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"image":{"@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","articleSection":["News"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#respond"]}]},{"@type":"WebPage","@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/","url":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/","name":"Sinwar Stalls Hostage Negotiations, Waits for Iran Attack - Bridges for Peace","isPartOf":{"@id":"https://www.bridgesforpeace.com/#website"},"primaryImageOfPage":{"@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage"},"image":{"@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage"},"thumbnailUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","datePublished":"2024-04-12T09:39:05+00:00","dateModified":"2024-04-12T09:39:05+00:00","breadcrumb":{"@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1","width":500,"height":500},{"@type":"BreadcrumbList","@id":"https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.bridgesforpeace.com/"},{"@type":"ListItem","position":2,"name":"Sinwar Stalls Hostage Negotiations, Waits for Iran Attack"}]},{"@type":"WebSite","@id":"https://www.bridgesforpeace.com/#website","url":"https://www.bridgesforpeace.com/","name":"Bridges for Peace","description":"Your Israel Connection","publisher":{"@id":"https://www.bridgesforpeace.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.bridgesforpeace.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://www.bridgesforpeace.com/#organization","name":"Bridges for Peace","url":"https://www.bridgesforpeace.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/logo/image/","url":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","contentUrl":"https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1","width":749,"height":747,"caption":"Bridges for Peace"},"image":{"@id":"https://www.bridgesforpeace.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/bridgesforpeace/","https://twitter.com/BridgesForPeace","https://www.youtube.com/bridgesforpeace1"]},{"@type":"Person","@id":"https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81","name":"mbrown","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.bridgesforpeace.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g","caption":"mbrown"},"url":"https://www.bridgesforpeace.com/author/mbrown/"}]}</script>\n<!-- / Yoast SEO plugin. -->',
        yoast_head_json: {
            title: 'Sinwar Stalls Hostage Negotiations, Waits for Iran Attack - Bridges for Peace',
            robots: {
                index: 'index',
                follow: 'follow',
                'max-snippet': 'max-snippet:-1',
                'max-image-preview': 'max-image-preview:large',
                'max-video-preview': 'max-video-preview:-1'
            },
            canonical: 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/',
            og_locale: 'en_US',
            og_type: 'article',
            og_title: 'Sinwar Stalls Hostage Negotiations, Waits for Iran Attack - Bridges for Peace',
            og_description:
                'Friday, 12 April 2024 | Israeli officials believe Hamas leader Yahya Sinwar is stalling and delaying his response to the latest proposal in the negotiations to free hostages. They believe there is not sufficient pressure being put on him to free the Israelis being held by Hamas and that he is waiting to see how',
            og_url: 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/',
            og_site_name: 'Bridges for Peace',
            article_publisher: 'https://www.facebook.com/bridgesforpeace/',
            article_published_time: '2024-04-12T09:39:05+00:00',
            og_image: [
                {
                    width: 500,
                    height: 500,
                    url: 'https://www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg',
                    type: 'image/jpeg'
                }
            ],
            author: 'mbrown',
            twitter_card: 'summary_large_image',
            twitter_creator: '@BridgesForPeace',
            twitter_site: '@BridgesForPeace',
            twitter_misc: {
                'Written by': 'mbrown',
                'Est. reading time': '2 minutes'
            },
            schema: {
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'Article',
                        '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#article',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/'
                        },
                        author: {
                            name: 'mbrown',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81'
                        },
                        headline: 'Sinwar Stalls Hostage Negotiations, Waits for Iran Attack',
                        datePublished: '2024-04-12T09:39:05+00:00',
                        dateModified: '2024-04-12T09:39:05+00:00',
                        mainEntityOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/'
                        },
                        wordCount: 234,
                        commentCount: 0,
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        articleSection: ['News'],
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'CommentAction',
                                name: 'Comment',
                                target: ['https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#respond']
                            }
                        ]
                    },
                    {
                        '@type': 'WebPage',
                        '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/',
                        url: 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/',
                        name: 'Sinwar Stalls Hostage Negotiations, Waits for Iran Attack - Bridges for Peace',
                        isPartOf: {
                            '@id': 'https://www.bridgesforpeace.com/#website'
                        },
                        primaryImageOfPage: {
                            '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage'
                        },
                        thumbnailUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        datePublished: '2024-04-12T09:39:05+00:00',
                        dateModified: '2024-04-12T09:39:05+00:00',
                        breadcrumb: {
                            '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#breadcrumb'
                        },
                        inLanguage: 'en-US',
                        potentialAction: [
                            {
                                '@type': 'ReadAction',
                                target: ['https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/']
                            }
                        ]
                    },
                    {
                        '@type': 'ImageObject',
                        inLanguage: 'en-US',
                        '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#primaryimage',
                        url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        contentUrl:
                            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
                        width: 500,
                        height: 500
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://www.bridgesforpeace.com/sinwar-stalls-hostage-negotiations-waits-for-iran-attack/#breadcrumb',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.bridgesforpeace.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Sinwar Stalls Hostage Negotiations, Waits for Iran Attack'
                            }
                        ]
                    },
                    {
                        '@type': 'WebSite',
                        '@id': 'https://www.bridgesforpeace.com/#website',
                        url: 'https://www.bridgesforpeace.com/',
                        name: 'Bridges for Peace',
                        description: 'Your Israel Connection',
                        publisher: {
                            '@id': 'https://www.bridgesforpeace.com/#organization'
                        },
                        potentialAction: [
                            {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.bridgesforpeace.com/?s={search_term_string}'
                                },
                                'query-input': 'required name=search_term_string'
                            }
                        ],
                        inLanguage: 'en-US'
                    },
                    {
                        '@type': 'Organization',
                        '@id': 'https://www.bridgesforpeace.com/#organization',
                        name: 'Bridges for Peace',
                        url: 'https://www.bridgesforpeace.com/',
                        logo: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/',
                            url: 'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            contentUrl:
                                'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2016/04/BridgesForPeaceWebLogo.jpg?fit=749%2C747&ssl=1',
                            width: 749,
                            height: 747,
                            caption: 'Bridges for Peace'
                        },
                        image: {
                            '@id': 'https://www.bridgesforpeace.com/#/schema/logo/image/'
                        },
                        sameAs: [
                            'https://www.facebook.com/bridgesforpeace/',
                            'https://twitter.com/BridgesForPeace',
                            'https://www.youtube.com/bridgesforpeace1'
                        ]
                    },
                    {
                        '@type': 'Person',
                        '@id': 'https://www.bridgesforpeace.com/#/schema/person/a6440b8a04bbe4593e043ee046213d81',
                        name: 'mbrown',
                        image: {
                            '@type': 'ImageObject',
                            inLanguage: 'en-US',
                            '@id': 'https://www.bridgesforpeace.com/#/schema/person/image/',
                            url: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            contentUrl: 'https://secure.gravatar.com/avatar/8f3ec2f57d622f02e5478f198f7a4bd4?s=96&d=mm&r=g',
                            caption: 'mbrown'
                        },
                        url: 'https://www.bridgesforpeace.com/author/mbrown/'
                    }
                ]
            }
        },
        jetpack_featured_media_url:
            'https://i0.wp.com/www.bridgesforpeace.com/wp-content/uploads/2024/04/News_4Apr12_2_hamas_Wikimedia.orgSQ_.jpg?fit=500%2C500&ssl=1',
        jetpack_shortlink: 'https://wp.me/p7vjMP-VGI',
        jetpack_sharing_enabled: true,
        publishpress_future_action: {
            enabled: false,
            date: '2024-04-23 16:14:53',
            action: 'change-status',
            newStatus: 'trash',
            terms: [],
            taxonomy: 'category'
        },
        _links: {
            self: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221756'
                }
            ],
            collection: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts'
                }
            ],
            about: [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/types/post'
                }
            ],
            author: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/users/9632'
                }
            ],
            replies: [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/comments?post=221756'
                }
            ],
            'version-history': [
                {
                    count: 1,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221756/revisions'
                }
            ],
            'predecessor-version': [
                {
                    id: 221763,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/posts/221756/revisions/221763'
                }
            ],
            'wp:featuredmedia': [
                {
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media/221757'
                }
            ],
            'wp:attachment': [
                {
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/media?parent=221756'
                }
            ],
            'wp:term': [
                {
                    taxonomy: 'category',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/categories?post=221756'
                },
                {
                    taxonomy: 'post_tag',
                    embeddable: true,
                    href: 'https://www.bridgesforpeace.com/wp-json/wp/v2/tags?post=221756'
                }
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true
                }
            ]
        }
    }
];
