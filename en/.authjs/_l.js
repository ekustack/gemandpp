        // Leaderboard Data - Top 60 Earners
        const leaderboardData = [
          // Top 10
          { rank: 1, name: "CryptoQueen", initial: "👑", pp: "234.5M", ppNum: 234500000, gems: 1234, trend: "up", change: 0, badge: "LEGEND", color: "#fbbf24" },
          { rank: 2, name: "MasterKane", initial: "MK", pp: "156.2M", ppNum: 156200000, gems: 892, trend: "up", change: 1, badge: "ELITE", color: "#38bdf8" },
          { rank: 3, name: "NinjaBoss", initial: "NB", pp: "98.7M", ppNum: 98700000, gems: 567, trend: "down", change: -1, badge: "VETERAN", color: "#10b981" },
          { rank: 4, name: "DiamondMind", initial: "DM", pp: "76.3M", ppNum: 76300000, gems: 445, trend: "up", change: 2, badge: "ELITE", color: "#ec4899" },
          { rank: 5, name: "ShadowWolf", initial: "SW", pp: "64.1M", ppNum: 64100000, gems: 378, trend: "up", change: 1, badge: "VETERAN", color: "#06b6d4" },
          { rank: 6, name: "PhoenixRise", initial: "PH", pp: "52.8M", ppNum: 52800000, gems: 312, trend: "down", change: -2, badge: "", color: "#f97316" },
          { rank: 7, name: "LunaVortex", initial: "LV", pp: "43.2M", ppNum: 43200000, gems: 256, trend: "up", change: 3, badge: "RISING", color: "#8b5cf6" },
          { rank: 8, name: "BlazeStorm", initial: "BS", pp: "35.6M", ppNum: 35600000, gems: 198, trend: "up", change: 5, badge: "", color: "#ef4444" },
          { rank: 9, name: "NeoGenesis", initial: "NG", pp: "28.9M", ppNum: 28900000, gems: 167, trend: "stable", change: 0, badge: "", color: "#14b8a6" },
          { rank: 10, name: "EchoFury", initial: "EF", pp: "24.1M", ppNum: 24100000, gems: 142, trend: "down", change: -1, badge: "", color: "#e11d48" },
          // Ranks 11-20
          { rank: 11, name: "StormRider", initial: "SR", pp: "21.3M", ppNum: 21300000, gems: 128, trend: "up", change: 2, badge: "", color: "#3b82f6" },
          { rank: 12, name: "GhostWalker", initial: "GW", pp: "19.7M", ppNum: 19700000, gems: 115, trend: "up", change: 1, badge: "", color: "#a855f7" },
          { rank: 13, name: "IronFist", initial: "IF", pp: "18.2M", ppNum: 18200000, gems: 108, trend: "down", change: -3, badge: "", color: "#78716c" },
          { rank: 14, name: "SolarFlare", initial: "SF", pp: "16.8M", ppNum: 16800000, gems: 97, trend: "up", change: 4, badge: "HOT", color: "#f59e0b" },
          { rank: 15, name: "VoidWalker", initial: "VW", pp: "15.4M", ppNum: 15400000, gems: 89, trend: "stable", change: 0, badge: "", color: "#6366f1" },
          { rank: 16, name: "MysticAce", initial: "MA", pp: "14.2M", ppNum: 14200000, gems: 82, trend: "up", change: 2, badge: "", color: "#d946ef" },
          { rank: 17, name: "CyberSamurai", initial: "CS", pp: "13.1M", ppNum: 13100000, gems: 76, trend: "down", change: -1, badge: "", color: "#0ea5e9" },
          { rank: 18, name: "NightOwl", initial: "NO", pp: "12.3M", ppNum: 12300000, gems: 71, trend: "up", change: 3, badge: "", color: "#1e293b" },
          { rank: 19, name: "FrostByte", initial: "FB", pp: "11.6M", ppNum: 11600000, gems: 65, trend: "up", change: 1, badge: "", color: "#06b6d4" },
          { rank: 20, name: "ThunderStrike", initial: "TS", pp: "10.9M", ppNum: 10900000, gems: 61, trend: "down", change: -1, badge: "", color: "#eab308" },
          // Ranks 21-30
          { rank: 21, name: "VenomX", initial: "VX", pp: "9.8M", ppNum: 9800000, gems: 55, trend: "up", change: 6, badge: "", color: "#22c55e" },
          { rank: 22, name: "RavenClaw", initial: "RC", pp: "9.2M", ppNum: 9200000, gems: 51, trend: "up", change: 2, badge: "", color: "#a1a1aa" },
          { rank: 23, name: "OmegaPrime", initial: "OP", pp: "8.7M", ppNum: 8700000, gems: 48, trend: "stable", change: 0, badge: "", color: "#0284c7" },
          { rank: 24, name: "SilverSurge", initial: "SS", pp: "8.3M", ppNum: 8300000, gems: 46, trend: "down", change: -2, badge: "", color: "#94a3b8" },
          { rank: 25, name: "DarkMatter", initial: "DM", pp: "7.9M", ppNum: 7900000, gems: 43, trend: "up", change: 1, badge: "", color: "#475569" },
          { rank: 26, name: "QuantumLeap", initial: "QL", pp: "7.5M", ppNum: 7500000, gems: 40, trend: "up", change: 4, badge: "", color: "#7c3aed" },
          { rank: 27, name: "TitanEdge", initial: "TE", pp: "7.1M", ppNum: 7100000, gems: 38, trend: "down", change: -1, badge: "", color: "#dc2626" },
          { rank: 28, name: "ApexHunter", initial: "AH", pp: "6.8M", ppNum: 6800000, gems: 36, trend: "up", change: 2, badge: "", color: "#16a34a" },
          { rank: 29, name: "ZeroCool", initial: "ZC", pp: "6.5M", ppNum: 6500000, gems: 34, trend: "stable", change: 0, badge: "", color: "#0891b2" },
          { rank: 30, name: "ViperStrike", initial: "VS", pp: "6.2M", ppNum: 6200000, gems: 32, trend: "up", change: 3, badge: "", color: "#b91c1c" },
          // Ranks 31-40
          { rank: 31, name: "NovaSpark", initial: "NS", pp: "5.9M", ppNum: 5900000, gems: 29, trend: "up", change: 1, badge: "", color: "#c084fc" },
          { rank: 32, name: "BronzeTiger", initial: "BT", pp: "5.6M", ppNum: 5600000, gems: 27, trend: "down", change: -2, badge: "", color: "#b45309" },
          { rank: 33, name: "AquaLord", initial: "AL", pp: "5.3M", ppNum: 5300000, gems: 25, trend: "up", change: 5, badge: "", color: "#0ea5e9" },
          { rank: 34, name: "PyroKing", initial: "PK", pp: "5.1M", ppNum: 5100000, gems: 24, trend: "stable", change: 0, badge: "", color: "#ea580c" },
          { rank: 35, name: "TerraForce", initial: "TF", pp: "4.9M", ppNum: 4900000, gems: 22, trend: "up", change: 2, badge: "", color: "#15803d" },
          { rank: 36, name: "WindRider", initial: "WR", pp: "4.7M", ppNum: 4700000, gems: 21, trend: "down", change: -1, badge: "", color: "#0284c7" },
          { rank: 37, name: "LightBringer", initial: "LB", pp: "4.5M", ppNum: 4500000, gems: 20, trend: "up", change: 3, badge: "", color: "#eab308" },
          { rank: 38, name: "ShadowSlicer", initial: "SS", pp: "4.3M", ppNum: 4300000, gems: 19, trend: "up", change: 1, badge: "", color: "#4c1d95" },
          { rank: 39, name: "CrystalMage", initial: "CM", pp: "4.1M", ppNum: 4100000, gems: 18, trend: "stable", change: 0, badge: "", color: "#be185d" },
          { rank: 40, name: "BoltRunner", initial: "BR", pp: "3.9M", ppNum: 3900000, gems: 17, trend: "down", change: -1, badge: "", color: "#ca8a04" },
          // Ranks 41-50
          { rank: 41, name: "EmberSoul", initial: "ES", pp: "3.7M", ppNum: 3700000, gems: 15, trend: "up", change: 4, badge: "", color: "#ef4444" },
          { rank: 42, name: "FrostGiant", initial: "FG", pp: "3.5M", ppNum: 3500000, gems: 14, trend: "up", change: 2, badge: "", color: "#06b6d4" },
          { rank: 43, name: "SteelHeart", initial: "SH", pp: "3.3M", ppNum: 3300000, gems: 13, trend: "stable", change: 0, badge: "", color: "#78716c" },
          { rank: 44, name: "VenomStrike", initial: "VS", pp: "3.1M", ppNum: 3100000, gems: 12, trend: "down", change: -3, badge: "", color: "#22c55e" },
          { rank: 45, name: "AeroKnight", initial: "AK", pp: "2.9M", ppNum: 2900000, gems: 11, trend: "up", change: 1, badge: "", color: "#8b5cf6" },
          { rank: 46, name: "MagmaCore", initial: "MC", pp: "2.7M", ppNum: 2700000, gems: 10, trend: "up", change: 6, badge: "", color: "#ea580c" },
          { rank: 47, name: "PsiBlade", initial: "PB", pp: "2.5M", ppNum: 2500000, gems: 9, trend: "stable", change: 0, badge: "", color: "#a855f7" },
          { rank: 48, name: "NeonPulse", initial: "NP", pp: "2.3M", ppNum: 2300000, gems: 8, trend: "down", change: -1, badge: "", color: "#ec4899" },
          { rank: 49, name: "OnyxShield", initial: "OS", pp: "2.1M", ppNum: 2100000, gems: 7, trend: "up", change: 2, badge: "", color: "#475569" },
          { rank: 50, name: "RuneMaster", initial: "RM", pp: "1.9M", ppNum: 1900000, gems: 6, trend: "up", change: 3, badge: "", color: "#c084fc" },
          // Ranks 51-60
          { rank: 51, name: "SwiftArrow", initial: "SA", pp: "1.7M", ppNum: 1700000, gems: 5, trend: "up", change: 5, badge: "", color: "#16a34a" },
          { rank: 52, name: "WarpDrive", initial: "WD", pp: "1.5M", ppNum: 1500000, gems: 5, trend: "stable", change: 0, badge: "", color: "#3b82f6" },
          { rank: 53, name: "EchoBlade", initial: "EB", pp: "1.3M", ppNum: 1300000, gems: 4, trend: "down", change: -2, badge: "", color: "#b45309" },
          { rank: 54, name: "SolarWind", initial: "SW", pp: "1.2M", ppNum: 1200000, gems: 4, trend: "up", change: 1, badge: "", color: "#f59e0b" },
          { rank: 55, name: "GravityWell", initial: "GW", pp: "1.1M", ppNum: 1100000, gems: 3, trend: "up", change: 4, badge: "", color: "#6366f1" },
          { rank: 56, name: "LunaCrest", initial: "LC", pp: "980K", ppNum: 980000, gems: 3, trend: "stable", change: 0, badge: "", color: "#d946ef" },
          { rank: 57, name: "IronWill", initial: "IW", pp: "890K", ppNum: 890000, gems: 3, trend: "down", change: -1, badge: "", color: "#78716c" },
          { rank: 58, name: "StarGazer", initial: "SG", pp: "810K", ppNum: 810000, gems: 2, trend: "up", change: 2, badge: "", color: "#0ea5e9" },
          { rank: 59, name: "BladeRunner", initial: "BR", pp: "740K", ppNum: 740000, gems: 2, trend: "up", change: 3, badge: "", color: "#e11d48" },
          { rank: 60, name: "VoidSeeker", initial: "VS", pp: "680K", ppNum: 680000, gems: 2, trend: "stable", change: 0, badge: "", color: "#0891b2" }
        ];
        
        let currentDisplayCount = 30;
        const leaderboardBody = document.getElementById('leaderboardBody');
        
        function formatPP(pp) {
          if (pp >= 1000000) return (pp / 1000000).toFixed(1) + 'M';
          if (pp >= 1000) return (pp / 1000).toFixed(0) + 'K';
          return pp.toString();
        }
        
        function renderLeaderboard(count) {
          const dataToShow = leaderboardData.slice(0, count);
          
          leaderboardBody.innerHTML = dataToShow.map(user => {
            const rankClass = user.rank === 1 ? 'rank-1' : user.rank === 2 ? 'rank-2' : user.rank === 3 ? 'rank-3' : '';
            const trendIcon = user.trend === 'up' ? 'fa-arrow-up' : user.trend === 'down' ? 'fa-arrow-down' : 'fa-minus';
            const trendClass = user.trend === 'up' ? 'trend-up' : user.trend === 'down' ? 'trend-down' : 'trend-stable';
            const changeText = user.change > 0 ? `+${user.change}` : user.change < 0 ? `${user.change}` : '';
            const badgeClass = user.badge === 'LEGEND' ? 'legend' : user.badge === 'ELITE' ? 'elite' : '';
            
            return `
                    <div class="leaderboard-row ${user.rank <= 3 ? 'top-rank' : ''}">
                        <div class="row-rank ${rankClass}">#${user.rank}</div>
                        <div class="row-user">
                            <div class="user-avatar" style="background: linear-gradient(145deg, ${user.color}, ${user.color}dd);">
                                ${user.initial}
                            </div>
                            <div class="user-info">
                                <div class="user-name">
                                    ${user.name}
                                    ${user.badge ? `<span class="user-badge ${badgeClass}">${user.badge}</span>` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="row-pp"><i class="fas fa-bolt" style="margin-right: 4px; opacity: 0.7;"></i>${user.pp}</div>
                        <div class="row-gems"><i class="fas fa-gem"></i> ${user.gems}</div>
                        <div class="row-trend ${trendClass}">
                            <i class="fas ${trendIcon}"></i>
                            ${changeText}
                        </div>
                    </div>
                `;
          }).join('');
          
          document.querySelector('.load-more-btn').innerHTML = `
                <i class="fas fa-chevron-down" style="margin-right: 8px;"></i>
                Load More (Showing 1-${count} of ${leaderboardData.length})
            `;
        }
        
        // Initial render
        renderLeaderboard(currentDisplayCount);
        
        // Load more functionality
        document.getElementById('loadMoreBtn').addEventListener('click', function() {
          if (currentDisplayCount < leaderboardData.length) {
            currentDisplayCount = Math.min(currentDisplayCount + 10, leaderboardData.length);
            renderLeaderboard(currentDisplayCount);
            
            if (currentDisplayCount === leaderboardData.length) {
              this.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i>All 60 Earners Loaded';
              this.disabled = true;
              this.style.opacity = '0.6';
              this.style.cursor = 'default';
            }
          }
        });
        
        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', function() {
          const query = document.getElementById('searchInput').value.toLowerCase();
          if (!query) {
            currentDisplayCount = 30;
            renderLeaderboard(currentDisplayCount);
            return;
          }
          
          const filtered = leaderboardData.filter(user =>
            user.name.toLowerCase().includes(query)
          );
          
          leaderboardBody.innerHTML = filtered.map(user => {
            const rankClass = user.rank === 1 ? 'rank-1' : user.rank === 2 ? 'rank-2' : user.rank === 3 ? 'rank-3' : '';
            const trendIcon = user.trend === 'up' ? 'fa-arrow-up' : user.trend === 'down' ? 'fa-arrow-down' : 'fa-minus';
            const trendClass = user.trend === 'up' ? 'trend-up' : user.trend === 'down' ? 'trend-down' : 'trend-stable';
            const changeText = user.change > 0 ? `+${user.change}` : user.change < 0 ? `${user.change}` : '';
            const badgeClass = user.badge === 'LEGEND' ? 'legend' : user.badge === 'ELITE' ? 'elite' : '';
            
            return `
                    <div class="leaderboard-row ${user.rank <= 3 ? 'top-rank' : ''}">
                        <div class="row-rank ${rankClass}">#${user.rank}</div>
                        <div class="row-user">
                            <div class="user-avatar" style="background: linear-gradient(145deg, ${user.color}, ${user.color}dd);">
                                ${user.initial}
                            </div>
                            <div class="user-info">
                                <div class="user-name">
                                    ${user.name}
                                    ${user.badge ? `<span class="user-badge ${badgeClass}">${user.badge}</span>` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="row-pp"><i class="fas fa-bolt"></i> ${user.pp}</div>
                        <div class="row-gems"><i class="fas fa-gem"></i> ${user.gems}</div>
                        <div class="row-trend ${trendClass}">
                            <i class="fas ${trendIcon}"></i>
                            ${changeText}
                        </div>
                    </div>
                `;
          }).join('');
          
          document.querySelector('.load-more-btn').style.display = 'none';
        });
        
        // Enter key search
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            document.getElementById('searchBtn').click();
          }
        });
        
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach((tab, index) => {
          tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            let sortedData = [...leaderboardData];
            
            if (index === 1) { // This Month
              sortedData = sortedData.sort((a, b) => b.ppNum * 0.3 - a.ppNum * 0.3);
            } else if (index === 2) { // This Week
              sortedData = sortedData.sort((a, b) => b.ppNum * 0.1 - a.ppNum * 0.1);
            } else if (index === 3) { // By Gems
              sortedData = sortedData.sort((a, b) => b.gems - a.gems);
            }
            
            leaderboardBody.innerHTML = sortedData.slice(0, currentDisplayCount).map((user, i) => {
              const displayRank = index > 0 ? i + 1 : user.rank;
              const rankClass = displayRank === 1 ? 'rank-1' : displayRank === 2 ? 'rank-2' : displayRank === 3 ? 'rank-3' : '';
              const trendIcon = user.trend === 'up' ? 'fa-arrow-up' : user.trend === 'down' ? 'fa-arrow-down' : 'fa-minus';
              const trendClass = user.trend === 'up' ? 'trend-up' : user.trend === 'down' ? 'trend-down' : 'trend-stable';
              const changeText = user.change > 0 ? `+${user.change}` : user.change < 0 ? `${user.change}` : '';
              const badgeClass = user.badge === 'LEGEND' ? 'legend' : user.badge === 'ELITE' ? 'elite' : '';
              
              return `
                        <div class="leaderboard-row ${displayRank <= 3 ? 'top-rank' : ''}">
                            <div class="row-rank ${rankClass}">#${displayRank}</div>
                            <div class="row-user">
                                <div class="user-avatar" style="background: linear-gradient(145deg, ${user.color}, ${user.color}dd);">
                                    ${user.initial}
                                </div>
                                <div class="user-info">
                                    <div class="user-name">
                                        ${user.name}
                                        ${user.badge ? `<span class="user-badge ${badgeClass}">${user.badge}</span>` : ''}
                                    </div>
                                </div>
                            </div>
                            <div class="row-pp"><i class="fas fa-bolt"></i> ${user.pp}</div>
                            <div class="row-gems"><i class="fas fa-gem"></i> ${user.gems}</div>
                            <div class="row-trend ${trendClass}">
                                <i class="fas ${trendIcon}"></i>
                                ${changeText}
                            </div>
                        </div>
                    `;
            }).join('');
          });
        });
        
