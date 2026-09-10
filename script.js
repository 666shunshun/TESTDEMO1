function filterProducts() {
    const input = document.getElementById('productSearchInput');
    const filter = input.value.toLowerCase().trim();
    const clearBtn = document.getElementById('clearSearchBtn');
    
    // 显示/隐藏清空按钮
    clearBtn.style.display = filter.length > 0 ? 'flex' : 'none';

    const categoryBoxes = document.querySelectorAll('.category-box');
    let hasAnyGlobalMatch = false;

    categoryBoxes.forEach(categoryBox => {
        const categoryHeader = categoryBox.querySelector('.category-header').textContent.toLowerCase();
        const brandBoxes = categoryBox.querySelectorAll('.brand-box');
        let categoryHasMatch = false;

        brandBoxes.forEach(brandBox => {
            const brandHeader = brandBox.querySelector('.brand-header').textContent.toLowerCase();
            const productItems = brandBox.querySelectorAll('.product-grid > div');
            let brandHasMatch = false;

            productItems.forEach(item => {
                const title = item.querySelector('h4') ? item.querySelector('h4').textContent.toLowerCase() : '';
                const desc = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';

                // 匹配规则：搜分类名、品牌名、产品名或描述都可以查出来
                if (title.includes(filter) || desc.includes(filter) || brandHeader.includes(filter) || categoryHeader.includes(filter)) {
                    item.style.display = "";
                    brandHasMatch = true;
                } else {
                    item.style.display = "none";
                }
            });

            // 如果该品牌下有匹配产品，显示品牌并自动展开 <details>
            if (brandHasMatch) {
                brandBox.style.display = "";
                brandBox.open = true; // 搜索时自动展开品牌
                categoryHasMatch = true;
            } else {
                brandBox.style.display = "none";
            }
        });

        // 如果该大分类下有匹配内容，显示大分类并自动展开
        if (categoryHasMatch) {
            categoryBox.style.display = "";
            categoryBox.open = true; // 搜索时自动展开大分类
            hasAnyGlobalMatch = true;
        } else {
            categoryBox.style.display = "none";
        }
    });

    // 如果清空搜索框，恢复默认状态（大分类展开，品牌折叠）
    if (filter === "") {
        categoryBoxes.forEach((cat, index) => {
            cat.style.display = "";
            cat.open = index === 0; // 默认展开第一个分类
            cat.querySelectorAll('.brand-box').forEach((brand, bIndex) => {
                brand.style.display = "";
                brand.open = bIndex === 0; // 默认展开第一个品牌
                brand.querySelectorAll('.product-grid > div').forEach(item => {
                    item.style.display = "";
                });
            });
        });
    }
}

// 清空搜索框
function clearSearch() {
    const input = document.getElementById('productSearchInput');
    input.value = '';
    filterProducts();
    input.focus();
}