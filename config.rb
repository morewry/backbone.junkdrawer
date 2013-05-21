# You may now add sass stylesheets to the styles/sass subdirectory of your project.

# Sass files beginning with an underscore are called partials and won't be
# compiled to CSS, but they can be imported into other sass stylesheets.

# You can configure your project by editing the config.rb configuration file.

# You must compile your sass stylesheets into CSS when they change.
# This can be done in one of the following ways:
#   1. To compile on demand:
#      compass compile [path/to/project]
#   2. To monitor your project for changes and automatically recompile:
#      compass watch [path/to/project]

################################################################

# Require any additional compass plugins here.

require "rgbapng"
# require "breakpoint"
require File.join(File.dirname(__FILE__), 'listfiles.rb')

# Set options

disable_warnings = true
compiletype = environment

# Set this to the root of your project when deployed:
# additional_import_paths = ['Y:\sass']

project_path = File.dirname(__FILE__) + "/"

http_path = "/resources"

css_dir = "css/"
sass_dir = "css/sass/"
images_dir = "img/"
javascripts_dir = "js/"
fonts_dir = "fonts/"
utils_dir = "utilities/"

utils_path =  project_path + utils_dir

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

output_style = (compiletype == :production) ? :expanded : :nested

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:

line_comments = (compiletype == :production) ? false : true

################################################################

# callback - on_stylesheet_saved
# http://stackoverflow.com/questions/9183133/how-to-turn-off-compass-sass-cache-busting/9332472
on_stylesheet_saved do |filename|
	if File.exists?(filename)
		cacheBuster = File.mtime(filename).strftime("%s")
		if (compiletype == :production)
			# Generate new documentation
			styleguide(filename, utils_path + "styledocco.bat")
		end
		css = File.read filename
		File.open(filename, 'w+') do |f|
			f << css.gsub(%r{-s[a-z0-9]{10}\.png}, ".png?v=#{cacheBuster}")
		end
	end
end

# callback - on_sprite_saved
# http://compass-style.org/help/tutorials/configuration-reference/
on_sprite_saved do |filename|
	if File.exists?(filename)
		if (compiletype == :production)
			# Post process sprite image
			# postprocesspng(filename, utils_path)
		end
	end
end

###############################################################

asset_cache_buster do |path, filename|
	if File.exists?(filename)
		cacheBuster = File.mtime(filename).strftime("%s")
	else
		cacheBuster = Time.now.strftime("%s")
	end
	"v=#{cacheBuster}"
end

###############################################################

# fn - Generate styleguide documentation with styledocco
# http://jacobrask.github.com/styledocco/
def styleguide(filename, script)
	if File.exists?(filename)
		sleep 1
		puts "Generating documentation/styleguide"
		system script + " " + filename
	end
end

# fn - Post processing for pngs
# http://compass-style.org/help/tutorials/configuration-reference/
def postprocesspng(filename, utils_path)
	if File.exists?(filename)
		sleep 1
		optimize(filename, utils_path + "pngquant/pngquant -iebug -verbose -force -ext .png 256")
		optimize(filename, utils_path + "pngout/pngoutbatch.cmd")
		optimize(filename, utils_path + "optipng/optipng -o7 -verbose")
	end
end

# fn - Rename sprite from one with hash to one without
# http://stackoverflow.com/questions/9183133/how-to-turn-off-compass-sass-cache-busting/9332472
def renamesprite(filename)
	if File.exists?(filename)
		cacheBuster = File.mtime(filename).strftime("%s")
		sleep 1
		FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, ".png?v=#{cacheBuster}")
	end
end

# fn - Run optimize command line for a specified script
# https://gist.github.com/2403117
def optimize(filename, script)
	if File.exists?(filename)
		sleep 1
		system script + " " + filename
	end
end

################################################################
