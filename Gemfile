source "https://rubygems.org"
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# https://github.com/github/pages-gem/issues/577
# gem "jekyll", "~> 4.0.0"

# there@DESKTOP-2OJLD58 MINGW64 /c/git/nate_site (master)
# $ bundle exec jekyll -v
# jekyll 3.8.6
# Note: If you are using a Jekyll version less than 3.5.0, use the gems key instead of plugins.
# https://github.com/benbalter/jekyll-remote-theme
# 
# (base)

gem "jekyll", "~> 3.3"
# This is the default theme for new Jekyll sites. You may change this to anything you like.
# gem "minima", "~> 2.5"

# In Gemfile:
# jekyll (~> 4.0.0) x64-mingw32

# jekyll-theme-hyde x64-mingw32 was resolved to 2.0.0, which depends on
#   jekyll (~> 3.3) x64-mingw32


# gem "jekyll-theme-hyde"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins
# If you have any plugins, put them here!

# https://jekyllrb.com/docs/themes/
# Or you could list them explicitly as Jekyll plugins in your Gemfile, and not update _config.yml, like this:
# this means the config.yml is redundant...?


group :jekyll_plugins do
  # gem "jekyll-feed", "~> 0.12"
  # gem "jekyll-paginate-v2"
  gem "jekyll-paginate"
  gem "jekyll-remote-theme"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

