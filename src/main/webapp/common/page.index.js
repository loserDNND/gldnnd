document.onerror = function() {
    return !0
};
var jsloader = new LazyJSONLoader,
    base_ads = 3,
    indexBlock = {
        top: {
            id: "b_index_top",
            area: '<div class="container-top-wrapper"><div class="container-top"><div class="b-l"></div><div class="b-r"><div class="top-list-wrapper"></div></div></div></div>',
            container: "#index_container",
            panes: {
                list: {
                    wrapper: ".b-r .top-list-wrapper",
                    dataContainer: '<ul class="top-list clearfix"></ul>',
                    dataSource: "/index/ranking-3day.json",
                    pagesize: 8,
                    render: "renderTopList",
                    onInitComplete: function(j) {
                        function n() {
                            switch (m) {
                                case 0:
                                    o.html("\u4e00\u5468");
                                    e.html("\u4e09\u65e5");
                                    break;
                                case 1:
                                    o.html("\u6628\u65e5");
                                    e.html("\u4e00\u5468");
                                    break;
                                case 2:
                                    o.html("\u4e09\u65e5"), e.html("\u6628\u65e5")
                            }
                        }
                        var l = j._super;
                        (new SliderController({
                            parent: ".container-top .b-l",
                            wrapper: $('<div class="topic-preview-wrapper"><div class="topic-preview-list-wrapper"><ul class="topic-preview"></ul></div><a class="more-topic" href="/topic/integrated-1.html" target="_blank">\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i></a><div class="s-bottom"><div class="title"></div></div></div>'),
                            item: function(g, h) {
                                var r = $('<li data-id="' + (g.id ? g.id : "") + '" data-loc-id="23"><a target="_blank"><img /></a></li>'),
                                    s = window.BiliCm && window.BiliCm.Base || {};
                                $("img", r).attr("src", utils.trimHttp(LoadWebp.setSrc(g.pic)));
                                var q = g.url || "",
                                    p = $("a", r);
                                g.is_ad_loc ? p.attr({ href: q ? s && $.isFunction(s.getSyncUrl) ? s.getSyncUrl(g, 23) : utils.trimHttp(q) : "javascript:void(0);", "data-target-url": q }) : p.attr({ href: utils.trimHttp(q) });
                                g.show = 0 == h ? !0 : !1;
                                g.focus = !0;
                                g.trigger = function() {};
                                this.dataLoop.push(g);
                                s && $.isFunction(s.add) && s.add(r, g);
                                return r
                            },
                            dataLoop: [],
                            bar: $('<ul id="topic_slider" class="slider-bar"></ul>'),
                            barContainer: ".s-bottom",
                            barItem: "<li></li>",
                            onLoad: function(a) {
                                a.data = utils.sortByIndex(a.data);
                                return this.data = a.data
                            },
                            renderCallback: function(f, g, p) {
                                var q = g.id ? g.id : "",
                                    h = null;
                                g.is_ad_loc ? (h = window.BiliCm && window.BiliCm.Base || {}, h = g.url ? h && $.isFunction(h.getSyncUrl) ? h.getSyncUrl(g, 23) : g.url : "javascript:void(0);", h = $('<span data-id="' + q + '" data-loc-id="23">' + (g.is_ad && g.is_ad_loc ? "<img src='//static.hdslb.com/images/base/ad.png' style='width:32px;height:20px;margin-right:5px;'>" : "") + '<a href="' + h + '" data-target-url: "' + g.url + '" target="_blank">' + g.name + "</a></span>").appendTo($(".title", f))) : h = $('<span data-id="' + q + '" data-loc-id="23">' + (g.is_ad && g.is_ad_loc ? "<img src='//static.hdslb.com/images/base/ad.png' style='width:32px;height:20px;margin-right:5px;'>" : "") + '<a href="' + g.url + '" target="_blank">' + g.name + "</a></span>").appendTo($(".title", f));
                                0 == p && h && h.show()
                            },
                            slideCallback: function(c, d) {
                                for (i in this.dataLoop) { this.dataLoop[i].show = !1 }
                                this.dataLoop[d].show = !0;
                                this.dataLoop[d].trigger();
                                $(".title span", c).hide();
                                $(".title", c).find("span:eq(" + d + ")").fadeIn(300)
                            },
                            dataSrc: "//api.bilibili.com/x/web-show/res/loc?callback=?&jsonp=jsonp&pf=0&id=23"
                        })).init();
                        var o = $('<div class="page prev no-select"></div>').appendTo(j.wrapper),
                            e = $('<div class="page next no-select"></div>').appendTo(j.wrapper),
                            k = ["/index/ranking.json", "/index/ranking-3day.json", "/index/ranking-week.json"],
                            m = 1;
                        n();
                        j.wrapper.hover(function() { $(this).find(".page").fadeIn(200) }, function() { $(this).find(".page").fadeOut(200) });
                        o.click(function() {
                            e.show();
                            m--;
                            0 > m && (m = 2);
                            n();
                            j.dataSource = k[m];
                            l.parseData(j)
                        });
                        e.click(function() {
                            o.show();
                            m++;
                            2 < m && (m = 0);
                            n();
                            j.dataSource = k[m];
                            l.parseData(j)
                        })
                    }
                }
            }
        },
        promote: { id: "b_promote", panes: { recommedList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><h2>\u63a8\u5e7f</h2></span>', dataContainer: '<ul class="rm-list"></ul>', dataSource: "//api.bilibili.com/x/web-show/res/loc?callback=?&jsonp=jsonp&pf=0&id=34", render: "renderPromote", pagesize: 5 }, ad: { wrapper: ".b-r", dataContainer: '<div class="index-promote"></div>', dataSource: "//api.bilibili.com/x/web-show/res/loc?callback=?&jsonp=jsonp&pf=0&id=29", render: "renderNewAds", random: !0, pagesize: 1 } } },
        live: {
            tid: "live",
            id: "b_live",
            panes: {
                recommedList: {
                    wrapper: ".b-l",
                    title: '<div class="left"><span class="b-head-i"></span><span class="b-head-t"><a href="//live.bilibili.com/" target="_blank"><h2>\u6b63\u5728\u76f4\u64ad</h2></a></span><span class="b-head-s" id="live_online_state"></span></div><div class="right"><div class="b-link-more"><a href="//live.bilibili.com" target="_blank">\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i></a></div></div>',
                    dataContainer: '<ul class="v-list-live"></ul>',
                    dataSource: "//api.live.bilibili.com/bili/recom",
                    multiAjaxs: {
                        count: 1,
                        urls: ["//api.live.bilibili.com/ajax/feed/list?callback=?&pagesize=6&page=1"],
                        mixin: function(b, c) {
                            return "success" === b[1] ? b[0] : null
                        }
                    },
                    jsonpCallback: "liveXhrDone",
                    render: "renderLiveList",
                    fail: function() {
                        this.area.remove();
                        $.each(indexNav.navItems, function(b, c) { "#b_live" == c.target && c.item.hide() });
                        indexNav.follow()
                    },
                    push: !0,
                    pushDataSource: "//api.live.bilibili.com/bili/recom_more"
                },
                attentionList: { wrapper: ".b-r", title: "", dataContainer: '<ul class="r-list-live" data-slider="true"></ul>', render: "renderLiveRanking", pagesize: 6, tab: CreateArea.createTab({ items: [{ name: "\u76f4\u64ad\u6392\u884c", attributes: { "data-source": "//api.live.bilibili.com/bili/recom", "data-view": "live-ranking", "data-jsonp": "liveXhrDone" } }, { name: "\u5173\u6ce8\u7684\u4e3b\u64ad", attributes: { "data-source": "//api.live.bilibili.com/ajax/feed/list?callback=?&pagesize=6&page=1", "data-view": "live-fav" } }, { name: "\u4e3a\u4f60\u63a8\u8350", attributes: { "data-source": "//api.live.bilibili.com/bili/recom", "data-view": "live-promote", "data-jsonp": "liveXhrDone", style: "display: none;" } }] }), tabTarget: ".b-head", tabChange: "tabChange" }
            }
        },
        tagPromote: { id: "b_tag_promote", panes: { recommedList: { wrapper: ".b-l", dataContainer: '<ul class="rm-list"></ul>', dataSource: "/index/data/promote-tag.json", render: "renderTagPromote", pagesize: 5 } } },
        douga: { tid: 1, id: "b_douga", panes: { dougaList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/douga.html" title="\u52a8\u753b"><h2>\u52a8\u753b</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "douga", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0, onInitComplete: function(b) {} }, dougaRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(1), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        bangumi: {
            tid: 13,
            id: "b_bangumi",
            panes: {
                bangumiCalendar: {
                    wrapper: ".b-l",
                    extraWrapperCls: "bgm-calendar",
                    title: '<a href="//bangumi.bilibili.com/22/" class="block-title-h2" title="\u756a\u5267"><span class="b-head-i"></span><span class="b-head-t"><h2>\u756a\u5267</h2></span></a><a class="c-clink" href="//bangumi.bilibili.com/anime/timeline" target="_blank">\u65b0\u756a\u65f6\u95f4\u8868<i class="b-icon b-icon-arrow-red-r"></i></a>',
                    dataContainer: '<ul class="c-list clearfix"></ul>',
                    dataSource: "//bangumi.bilibili.com/jsonp/timeline_v2_global.ver",
                    jsonpCallback: "timeline",
                    render: "renderBangumiCalendar",
                    pagesize: 12,
                    type: "bangumi",
                    tab: '<div class="b-tab"><ul class="clearfix"><li class="wn" data-day=n data-name="\u6700\u65b0"><span></span></li><li class="w1" data-day=1 data-name="\u4e00"><span></span></li><li class="w2" data-day=2 data-name="\u4e8c"><span></span></li><li class="w3" data-day=3 data-name="\u4e09"><span></span></li><li class="w4" data-day=4 data-name="\u56db"><span></span></li><li class="w5" data-day=5 data-name="\u4e94"><span></span></li><li class="w6" data-day=6 data-name="\u516d"><span></span></li><li class="w0" data-day=0 data-name="\u65e5"><span></span></li></ul></div>',
                    tabTarget: ".b-head",
                    onInitComplete: function(b) {
                        var c = (new Date).getDay();
                        b.tab.find("[data-day=n]").addClass("on");
                        b.tab.find("li").each(function(e, f) {
                            var d = $(f);
                            d.attr("data-day") == c ? d.find("span").text("\u5468" + d.attr("data-name")) : d.find("span").text(d.attr("data-name"))
                        })
                    }
                },
                bangumiRanking: { wrapper: ".b-r", extraWrapperCls: "bgm-calendar", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<ul class="rlist bangumi-ranking"></ul>', jsonpCallback: "bangumiRankCallback", render: "renderBangumiRanking", pagesize: 8, type: "hot", selector: CreateArea.createRankingSelect(13), selectorTarget: ".b-head .right", selectChange: "selectChange" },
                bangumiList: { template: '<div class="b-section-body b-section-bangumi"><div class="b-l"><div class="b-head"></div><div class="b-body"></div></div></div>', title: '<span class="b-head-t">\u756a\u5267\u52a8\u6001</span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "bangumi", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 },
                bangumiPromote: { template: '<div class="b-r bangumi"><div class="b-head"><span class="b-head-t"><h3>\u7279\u522b\u63a8\u8350</h3></span></div><div class="b-body"></div></div>', templateTarget: ".b-section-bangumi" }
            }
        },
        guochuang: {
            tid: 167,
            id: "b_guochuang",
            panes: {
                guochuangCalendar: {
                    wrapper: ".b-l",
                    extraWrapperCls: "bgm-calendar",
                    title: '<a href="//bangumi.bilibili.com/guochuang/" class="block-title-h2" title="\u56fd\u4ea7\u539f\u521b"><span class="b-head-i"></span><span class="b-head-t"><h2>\u56fd\u521b</h2></span></a><a class="c-clink" href="//bangumi.bilibili.com/guochuang/timeline" target="_blank">\u65b0\u756a\u65f6\u95f4\u8868<i class="b-icon b-icon-arrow-red-r"></i></a>',
                    dataContainer: '<ul class="c-list clearfix"></ul>',
                    dataSource: "//bangumi.bilibili.com/jsonp/timeline_v2_cn.ver",
                    jsonpCallback: "gc_timeline",
                    render: "renderBangumiCalendar",
                    pagesize: 8,
                    type: "guochuang",
                    tab: '<div class="b-tab"><ul class="clearfix"><li class="wn" data-day=n data-name="\u6700\u65b0"><span></span></li><li class="w1" data-day=1 data-name="\u4e00"><span></span></li><li class="w2" data-day=2 data-name="\u4e8c"><span></span></li><li class="w3" data-day=3 data-name="\u4e09"><span></span></li><li class="w4" data-day=4 data-name="\u56db"><span></span></li><li class="w5" data-day=5 data-name="\u4e94"><span></span></li><li class="w6" data-day=6 data-name="\u516d"><span></span></li><li class="w0" data-day=0 data-name="\u65e5"><span></span></li></ul></div>',
                    tabTarget: ".b-head",
                    onInitComplete: function(b) {
                        var c = (new Date).getDay();
                        b.tab.find("[data-day=n]").addClass("on");
                        b.tab.find("li").each(function(e, f) {
                            var d = $(f);
                            d.attr("data-day") == c ? d.find("span").text("\u5468" + d.attr("data-name")) : d.find("span").text(d.attr("data-name"))
                        })
                    }
                },
                guochuangRanking: { wrapper: ".b-r", extraWrapperCls: "bgm-calendar", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<ul class="rlist top-3"></ul>', jsonpCallback: "guochuangRankCallback", render: "renderGuochuangRanking", pagesize: 3, type: "hot", selector: CreateArea.createRankingSelect(167), selectorTarget: ".b-head .right", selectChange: "selectChange" },
                guochuangList: { tid: 168, wrapper: ".b-l", template: '<div class="b-section-body b-section-guochuang"><div class="b-l"><div class="b-head"></div><div class="b-body"></div></div></div>', title: '<span class="b-head-t">\u56fd\u4ea7\u539f\u521b\u76f8\u5173</span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "guochuang", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 },
                relateRanking: { tid: 168, template: '<div class="b-r guochuang-relate"><div class="b-head"><div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div></div><div class="b-body"></div></div>', templateTarget: ".b-section-guochuang", dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, type: "hot", selector: CreateArea.createRankingSelect(168), selectorTarget: ".b-head .right", selectChange: "selectChange", tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange" }
            }
        },
        music: { tid: 3, id: "b_music", panes: { musicList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/music.html" title="\u97f3\u4e50"><h2>\u97f3\u4e50</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "music", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, musicRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(3), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        dance: { tid: 129, id: "b_dance", panes: { danceList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/dance.html" title="\u821e\u8e48"><h2>\u821e\u8e48</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "dance", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, danceRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(129), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        game: { tid: 4, id: "b_game", panes: { gameList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/game.html" title="\u6e38\u620f"><h2>\u6e38\u620f</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "game", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, gameRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(4), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        technology: { tid: 36, id: "b_technology", panes: { techList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/technology.html" title="\u79d1\u6280"><h2>\u79d1\u6280</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "technology", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, techRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(36), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        life: { tid: 160, id: "b_life", panes: { lifeList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/life.html" title="\u751f\u6d3b"><h2>\u751f\u6d3b</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "life", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, lifeRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(160), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        kichiku: { tid: 119, id: "b_kichiku", panes: { kichikuList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/kichiku.html" title="\u9b3c\u755c"><h2>\u9b3c\u755c</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "kichiku", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, kichikuRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(119), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        movie: { tid: 23, id: "b_movie", panes: { movieList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="//bangumi.bilibili.com/movie/" title="\u7535\u5f71"><h2>\u7535\u5f71</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "movie", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, movieRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(23), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        teleplay: { tid: 11, id: "b_teleplay", panes: { movieList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="//bangumi.bilibili.com/tv/" title="\u7535\u89c6\u5267"><h2>\u7535\u89c6\u5267</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "teleplay", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, movieRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(11), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        fashion: { tid: 155, id: "b_fashion", panes: { fashionList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/fashion.html" title="\u65f6\u5c1a"><h2>\u65f6\u5c1a</h2></a></span>', dataContainer: '<ul class="v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "fashion", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, fashionRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(155, { selected: 1 }), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        "ad-ad-1": { tid: 165, id: "b_ad", panes: { adList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/ad-ad-1.html" title="\u5e7f\u544a"><h2>\u5e7f\u544a</h2></a></span>', dataContainer: '<ul class="v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "ad", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, adRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(165), selectorTarget: ".b-head .right", selectChange: "selectChange", readmore: !1 } } },
        ent: { tid: 5, id: "b_ent", className: "c-r-multi", panes: { entList: { wrapper: ".b-l", title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/video/ent.html" title="\u5a31\u4e50"><h2>\u5a31\u4e50</h2></a></span>', dataContainer: '<ul class="vidbox v-list"></ul>', render: "renderIndexList", pagesize: 10, type: "ent", tab: CreateArea.createListTab(), tabTarget: ".b-head", tabChange: "tabChange", push: !0 }, entRanking: { wrapper: ".b-r", title: '<div class="left"><span class="b-head-t"><h3>\u6392\u884c</h3></span></div><div class="right"></div>', dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>', render: "renderIndexRanking", pagesize: 7, tab: CreateArea.createRankingTab(), tabTarget: ".b-head .left", tabChange: "tabChange", selector: CreateArea.createRankingSelect(5), selectorTarget: ".b-head .right", selectChange: "selectChange" } } },
        recommend: { id: "b_recommend", empty: !0, panes: { recommedList: { template: '<div class="b-l"><div class="b-head"></div><div class="b-body"></div></div><div class="b-r"></div>', title: '<span class="b-head-i"></span><span class="b-head-t"><a href="/list/recommend/1.html" title="\u7279\u522b\u63a8\u8350"><h2>\u7279\u522b\u63a8\u8350</h2></a></span>', dataContainer: '<ul class="rm-list recommend"></ul>', dataSource: "/index/recommend.json", render: "renderRecommend", pagesize: 5 } } }
    };

function buildop(f, j, h, k) {
    var e = $(f);
    $(j);
    e.click(function() {
        var b = e.index($(this));
        "undefined" !== typeof h && ChatSaveSettings(h, b);
        e.removeClass("on");
        $(this).addClass("on")
    });
    (f = k || ChatGetSettings(h)) ? $(e.get(f)).trigger("click"): 3 == e.length ? $(e.get(1)).trigger("click") : $(e.get(0)).trigger("click")
}
$(function() { addReturnToMobile() });
